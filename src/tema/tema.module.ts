import { Module } from "@nestjs/common";
import { Tema } from "./entities/tema.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./controllers/tema.controller";
import { TemaService } from "./services/tema.service";



@Module({
    imports: [TypeOrmModule.forFeature([Tema])], // coisas que vao ser importadas para o modulos
    providers: [TemaService], // classe de servicos
    controllers: [TemaController], // classe controladora
    exports: [TypeOrmModule], // deixar disponivel para outros modulos

})

export class TemaModules {}