import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {BrowserHistory, BrowserHistoryCreationAttrs} from "./browser-history.model";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/users.model";

@Injectable()
export class BrowserHistoryService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(BrowserHistory) private historyRepository: typeof BrowserHistory, private jwtService: JwtService) {
    }

    async create(dto: BrowserHistoryCreationAttrs, authHeader: string) {
        console.log(authHeader);
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if (bearer !== 'Bearer') {
            if (bearer === 'Noreg') {
                console.log(bearer);
                const users = await this.userRepository.findAll({where: {userCode: token}, include: {all: true}});
                // console.log(users[0].id);
                console.log(users);
                if (users[0]) {
                    console.log({...dto, userId: users[0].id});
                    return this.historyRepository.create({...dto, userId: users[0].id});
                } else {
                    return {error: 1}
                }

            } else {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
        }
        console.log(token);
        const user = this.jwtService.verify(token);
        console.log(user, 'history')
        dto.userId = user.id;
        console.log(dto, 'dto')
        return this.historyRepository.create(dto);
    }
}
