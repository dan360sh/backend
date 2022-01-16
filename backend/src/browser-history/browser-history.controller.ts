import {Body, Controller, Headers, Post} from '@nestjs/common';
import {BrowserHistoryCreationAttrs} from "./browser-history.model";
import {BrowserHistoryService} from "./browser-history.service";

@Controller('browser-history')
export class BrowserHistoryController {
    constructor(private historyService: BrowserHistoryService) {}
    @Post()
    createHistory(@Body() dto: BrowserHistoryCreationAttrs, @Headers('Authorization') token: string) {
        return this.historyService.create(dto, token)
    }

}
