import {forwardRef, Module} from '@nestjs/common';
import { BrowserHistoryController } from './browser-history.controller';
import { BrowserHistoryService } from './browser-history.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {BrowserHistory} from "./browser-history.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [BrowserHistoryController],
  providers: [BrowserHistoryService],
  imports: [
    SequelizeModule.forFeature([User, BrowserHistory]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    BrowserHistoryService,
  ]
})
export class BrowserHistoryModule {}
