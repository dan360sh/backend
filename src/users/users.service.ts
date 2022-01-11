import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtService} from "@nestjs/jwt";
import {createTransport} from "nodemailer";
export interface MailModel{
    code: number;
    email: string;
}
@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                private jwtService: JwtService) {
    }

    getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    async createUser(dto: CreateUserDto) {
        let code = this.getRandomInt(9000000000);
        const user = await this.userRepository.create({...dto, userCode: code.toString(), userFlag: 1, emailCode: this.getRandomInt(9999)});
        const role = await this.roleService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id])
        user.roles = [role]
        this.sendEmail(user.emailCode, user.email);
        return user;
    }
    async confirmationMail(mailModel: MailModel){
       let userUpdate  = await this.userRepository.update({userFlag: 2}, {where: {email: mailModel.email, emailCode: mailModel.code}});
       console.log(userUpdate, 'userUpdate');
       return userUpdate;
    }

    async createUserAnone() {
        let code = this.getRandomInt(9000000000);
        const user = await this.userRepository.create({userCode: code.toString()});
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUsers(authHeader: string) {
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
        const user = this.jwtService.verify(token);
        const email = user.email;
        const users = await this.userRepository.findAll({where: {email}, include: 'historyСrystal'});
        return users[0];
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
    async sendEmail(code: number, emailTo: string){
        const transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'swqazxcd@gmail.com',
                pass: 'Romabaranov222'
            }
        });
        transporter.sendMail({
            from: 'swqazxcd@gmail.com',
            to: emailTo,
            subject: 'Активация аккаунта',
            text: 'Код активации: ' + code
        })
    }
}
