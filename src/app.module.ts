import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModules } from './postagem/postagem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // abaixo estamos fazendo a conexão com o banco de dados.
      type: 'mysql', // tipo do banco de dados
      host: 'localhost', // localhost é a propria maquina
      port: 3306, // porta do mysql
      username: 'root', // user do mysql
      password: 'root', // senha do user do mysql
      database: 'db_blogpessoal', // nome do bd no mysql, esse banco de dados tem que criar no mysql, o nest cria somente as tabelas e nao o bd
      entities: [Postagem], // esta identificando se existe no banco de dados.
      synchronize: true, // ele faz a sincronizacao do classe orms comm as tabelas
      logging: true,  // mostra a consulta feita pelo TYPORM, so usa em desenvolvimento, em producao tiramos para nao poluir o terminal
    }),
    PostagemModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
