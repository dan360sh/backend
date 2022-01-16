import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {HistoryCreationAttrs, HistoryСrystal} from "./history.model";
import {UsersService} from "../users/users.service";

@Injectable()
export class HistoryService {
    constructor(@InjectModel(HistoryСrystal) private historyRepository: typeof HistoryСrystal, private userService: UsersService) {}
    async create(dto: HistoryCreationAttrs){
        console.log('ошибка скоро?')
        let userUpdate  = await this.userService.cristalUpdate(dto.userId, dto.plusСrystal);
        console.log(userUpdate, 'usrup');
        return await this.historyRepository.create(dto);
    }
}
