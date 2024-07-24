

//problema no banco de dados = repository
//problema no processamento = service
//se ta chegando com erro no processamento = controller

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";



@Controller("/temas")  // esta classe é do tipo controladora
export class TemaController {

    constructor(private readonly temaService: TemaService) { }

    @Get()
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findAll(): Promise<Tema[]> { // este metodo vai devolver a promise
        return this.temaService.findAll(); // estamos chamando o metodo que esta em service
    }

    @Get('/:id')// estamos definindo que o id é uma variavel e ele que vamos buscar na linha 26
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.temaService.findById(id);
    }

    @Get('/descricao/:descricao')//colocamos assim('/descricao/:descricao') para nao confundir com o id na hora da busca.  Estamos definindo que o descricao é uma string e ele que vamos buscar na linha 31
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findByDescricao(@Param('descricao',) descricao: string): Promise<Tema[]> {
        return this.temaService.findByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // Http Status 201 de confirmacao para criacao de algo.
    create(@Body () tema: Tema): Promise<Tema> { // aqui vamos pegar o objeto do corpo da requisicao atrves do formato J-son que e o @Body
        return this.temaService.create(tema); 
    }

    @Put()
    @HttpCode(HttpStatus.OK) // Http status 200
    update(@Body () tema: Tema): Promise<Tema> { // estamos fazendo a atualizacao
        return this.temaService.update(tema); 
    }
    @Delete('/:id')// estamos definindo que o id é uma variavel 
    @HttpCode(HttpStatus.NO_CONTENT) // Http status 200, ele retorna isso se estiver tudo certo.
    delete(@Param('id', ParseIntPipe) id: number){  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.temaService.delete(id);

}

}