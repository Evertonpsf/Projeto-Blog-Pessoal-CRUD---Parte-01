import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";


//problema no banco de dados = repository
//problema no processamento = service
//se ta chegando com erro no processamento = controller



@Controller("/postagens")  // esta classe é do tipo controladora
export class PostagemController {

    constructor(private readonly postagemService: PostagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findAll(): Promise<Postagem[]> { // este metodo vai devolver a promise
        return this.postagemService.findAll(); // estamos chamando o metodo que esta em service
    }

    @Get('/:id')// estamos definindo que o id é uma variavel e ele que vamos buscar na linha 26
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')//colocamos assim('/titulo/:titulo') para nao confundir com o id na hora da busca.  Estamos definindo que o titulo é uma variavel e ele que vamos buscar na linha 31
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findByTitulo(@Param('titulo',) titulo: string): Promise<Postagem[]> {
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // Http Status 201 de confirmacao para criacao de algo.
    create(@Body () postagem: Postagem): Promise<Postagem> { // aqui vamos pegar o objeto do corpo da requisicao atrves do formato J-son que e o @Body
        return this.postagemService.create(postagem); 
    }

    @Put()
    @HttpCode(HttpStatus.OK) // Http status 200
    update(@Body () postagem: Postagem): Promise<Postagem> { // estamos fazendo a atualizacao
        return this.postagemService.update(postagem); 
    }
    @Delete('/:id')// estamos definindo que o id é uma variavel e ele que vamos buscar na linha 26
    @HttpCode(HttpStatus.NO_CONTENT) // Http status 200, ele retorna isso se estiver tudo certo.
    delete(@Param('id', ParseIntPipe) id: number){  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.postagemService.delete(id);

}

}
