import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";
import {StaticModule} from "./static.module";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, { cors: true })
    //const react = await NestFactory.create(StaticModule, { cors: true })
    const config = new DocumentBuilder()
        .setTitle('Урок по продвинотому BACKEND')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('ULBI TV')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())
   // await react.listen(80, () => console.log(`реакт стартовал = ${80}`))
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));

}

start()
