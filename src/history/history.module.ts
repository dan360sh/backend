import {forwardRef, Module} from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {HistoryСrystal} from "./history.model";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [
    SequelizeModule.forFeature([User, HistoryСrystal]),
    forwardRef(() => UsersModule),
  ],
  exports: [
    HistoryService
  ]
})
export class HistoryModule {}
