import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModules } from "../tema/tema.module";
import { TemaService } from "../tema/services/tema.service";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModules], // coisas que vao ser importadas para o modulos
    providers: [PostagemService, TemaService], // classe de servicos
    controllers: [PostagemController], // classe controladora
    exports: [TypeOrmModule], // deixar disponivel para outros modulos

})

export class PostagemModules {}