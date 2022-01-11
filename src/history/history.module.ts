import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {FilesModule} from "../files/files.module";
import {HistoryСrystal} from "./history.model";

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [
    SequelizeModule.forFeature([User, HistoryСrystal]),
    FilesModule
  ]
})
export class HistoryModule {}
