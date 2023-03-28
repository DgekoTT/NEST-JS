import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";


async function start () {
  const PORT = process.env.PORT || 4050;
  const app = await NestFactory.create(AppModule);

  //npm i @nestjs/swagger swagger-ui-express установка свагера

  const config = new DocumentBuilder()// паттерн строитель(из свагера)
      .setTitle('First edition')
      .setDescription('Documentation REST API')
      .setVersion('1.0.0')
      .addTag("Dgeko")
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  /*app.useGlobalGuards(JwtAuthGuard) если его активировать то все ендпоинты
  будут проходить проверкуб можно добавлять несколько гвардов
  ==========================================================================
  app.useGlobalPipes(new ValidationPipe()) глобальное использование пайпа,
  все ендпоинты будут проходить валидациюБ можоно использовать несколько вали
  даторов
   */


  await app.listen(PORT, () => console.log(`Server is started on PORT = ${PORT} `))
}


start()