import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {MailModel, UsersService} from "../users/users.service";
import {HistoryService} from "../history/history.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private usersService: UsersService,
               ) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        console.log('запрос на reg')
        return this.authService.registration(userDto)
    }
    @Post('/noregistration')
    noRegistration() {
        console.log('запрос на no reg')
        return this.authService.noRegistration()
    }

    @Post('/confirmation-mail')
    confirmationMail(@Body() mailModel: MailModel) {
        return this.usersService.confirmationMail(mailModel);
    }
}
