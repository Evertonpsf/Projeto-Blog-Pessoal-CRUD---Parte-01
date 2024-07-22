import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";


//problema no banco de dados = repository
//problema no processamento = service
//se ta chegando com erro no processamento = controller



@Controller("/postagens")  // esta classe é do tipo controladora
export class PostagemController {

    constructor(private readonly postagemService: PostagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK) // Http status 200
    findAll(): Promise<Postagem[]> { // este metodo vai devolver a promise
        return this.postagemService.findAll(); // estamos chamando o metodo que esta em service
    }
}


