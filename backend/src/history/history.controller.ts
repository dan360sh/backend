import {Body, Controller, Ip, Post} from '@nestjs/common';
import {HistoryService} from "./history.service";
import {HistoryCreationAttrs} from "./history.model";



@Controller('history')
export class HistoryController {
    constructor(private historyService: HistoryService) {}
    @Post()
    createHistory(@Body() dto: HistoryCreationAttrs) {
        return this.historyService.create(dto)
    }
}
