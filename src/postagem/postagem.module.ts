import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], // coisas que vao ser importadas para o modulos
    providers: [PostagemService], // classe de servicos
    controllers: [PostagemController], // classe controladora
    exports: [TypeOrmModule], // deixar disponivel para outros modulos

})

export class PostagemModules {}