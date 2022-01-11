import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {HistoryCreationAttrs, HistoryСrystal} from "./history.model";

@Injectable()
export class HistoryService {
    constructor(@InjectModel(HistoryСrystal) private historyRepository: typeof HistoryСrystal) {}
    create(dto: HistoryCreationAttrs){
        return this.historyRepository.create(dto);
    }
}
