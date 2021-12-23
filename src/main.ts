import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';

let PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  
  const config = new DocumentBuilder()
  .setTitle('Poke Onbank')
  .setDescription(`Poke API onbank, abaixo está os endpoints que podem ser realizados buscas e consumos, baseados na pokeapi, utilizando-se da mesma via @nestjs/axios.
  Para consultas na PokeAPI, foi criado o endpoint /pokeapi, para consultas na custom database, fora utilizado o endpoint /pokes.`)
  .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  
  await app.listen(PORT);
}
bootstrap();
