import {Module} from "@nestjs/common";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';
import { join } from 'path';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'react'),
        }),
    ]
})
export class StaticModule {
    constructor() {
        console.log(join(__dirname, '../..', 'react'));
    }

}
