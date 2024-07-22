import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


process.env.TZ = '-03:00'; // essa configuracao e para arrumar a hora de brasilia, fusuorario

app.useGlobalPipes(new ValidationPipe()); // essa biblioteca usa-se para validar as requisicoes http, assim aplica-se em todo codigo, ouseja, global. Em todas as rotas http


app.enableCors(); // vem de crosorigens, aqui estamos ativando o cors. Se isso nao estiver ativado o front-end nao consegue conversar com o back-end, se estivermos o front e o banck em servidores diferente esse cores nmao estiver ativado nao tem como o front e o back se encontrar, isso se ativar para que aceitem servidores diferentes.


  await app.listen(4000);
}
bootstrap();
