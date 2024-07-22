// vamos implemntar os metodos para o banco de dados.
// vamos criar o listar todas as postagens.

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

@Injectable() // esse decorador indica que e uma classe de servico
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem> // ele é privado pois vai funcionar somente dentro de postagem. Respository vai trabalhar com a classe postagem, criando instrucoes SQL com a classe postagem
    ) { }
    //criando a promisse, que é necessario para trabalharo na web, que é usada na programação assicrona
    async findAll(): Promise<Postagem[]> { // aqui estamos fazendo uma promesssa(promise) que vamos trazer os dados do array da tb postagens
        return await this.postagemRepository.find(); // Essa linhas é a mesma coisa de ir no bd e chamar a visualizacao da tabela, pois aqui a tabela vem de rpository
        // Sempre que tivemos o async teremos que ter o await apos, pq isso é obrigatorio e nao opcional. async faz a pergunta e busca e o await espera a resposta.

    }
}