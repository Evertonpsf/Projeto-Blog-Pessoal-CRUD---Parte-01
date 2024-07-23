// vamos implemntar os metodos para o banco de dados.
// vamos criar o listar todas as postagens.

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable() // esse decorador indica que e uma classe de servico
export class PostagemService {
    
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem> // a tipagem de Rapository é a classe Postagem, por isso ela esta na classe construtora.  Ele é privado pois vai funcionar somente dentro de postagem. Respository vai trabalhar com a classe postagem, criando instrucoes SQL com a classe postagem
    ) { }
    //criando a promisse, que é necessario para trabalharo na web, que é usada na programação assicrona
    async findAll(): Promise<Postagem[]> { // aqui estamos fazendo uma promesssa(promise) que vamos trazer os dados do array da tb postagens
        return await this.postagemRepository.find(); // Essa linhas é a mesma coisa de ir no bd e chamar a visualizacao da tabela, pois aqui a tabela vem de rpository, isso tambem para trabalhar no modo assicrono.
        // Sempre que tivemos o async teremos que ter o await apos, pq isso é obrigatorio e nao opcional. async faz a pergunta e busca e o await espera a resposta.
    }

    async findById(id: number): Promise<Postagem> {
        // estamos fazendo o metodo para buscar apenas uma ocorrencia no banco de dados, no caso o id.

        let buscaPostagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        })

        if (!buscaPostagem) // este if indica que se o di nao for encontrado vai mostrar esta mensagem abaixo.
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        return buscaPostagem;

    }

    async findByTitulo(titulo: string): Promise<Postagem[]> { // o colchete indica que pode ser que traga mais de um titulo, serve para mostrar os que puxarem.
        // estamos fazendo o metodo para buscar apenas uma ocorrencia no banco de dados, no caso o titulo.

        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // usamos o ILike pois é insensitivo, assim busca o titulo independente da forma que esteja escrito, em maisculo ou minusculo.
            }
        })

    }
    async create(postagem: Postagem): Promise<Postagem> { // aqui estamos criando o metodo de postagem, para fazer a postagem
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {

        let buscaPostagem = await this.findById(postagem.id);

        if (!buscaPostagem || !postagem.id) // esta checando se buscaPostagem é diferente de nulo, ou se nao foi passado id vai devolver uma excessao
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        // a diferenca do criar para o atualizar é que no criar nao passsa o id e aqui no atuhalizar passa, este metodo atualiza o objeto inteiro.

        return await this.postagemRepository.save(postagem);
    }
    async delete(id: number): Promise<DeleteResult> {
        // estamos fazendo o metodo para deletar apenas uma ocorrencia no banco de dados.

        let buscaPostagem = await this.findById(id)
    
    if(!buscaPostagem) 
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);
    return await this.postagemRepository.delete(id);

}
}