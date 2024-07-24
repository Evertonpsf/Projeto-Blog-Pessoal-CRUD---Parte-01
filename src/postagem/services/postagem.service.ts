
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) { }


    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {
                tema: true // tem que fazer isso para quando buscar as postagens exibir o tema que esta relacionado
            }
        });
    }

    async findById(id: number): Promise<Postagem> {


        let buscaPostagem = await this.postagemRepository.findOne({// aqui estamos buscando uma postagem, por id por isso passamos o id
            where: {
                id
            },
            relations: {
                tema: true
            }
        })

        if (!buscaPostagem)
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);

        return buscaPostagem;

    }

    async findByTitulo(titulo: string): Promise<Postagem[]> { // o colchete indica que pode ser que traga mais de um titulo, serve para mostrar os que puxarem.
        // estamos fazendo o metodo para buscar apenas uma ocorrencia no banco de dados, no caso o titulo.

        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) // usamos o ILike pois é insensitivo, assim busca o titulo independente da forma que esteja escrito, em maisculo ou minusculo.
            },
            relations: {
                tema: true
            }
        })

    }
    async create(postagem: Postagem): Promise<Postagem> { // aqui estamos criando o metodo de postagem, para fazer a postagem

        if (postagem.tema) { // aqui abaixo foi criado o id do tema, verificando se existe por isso tem o if.

            let tema = await this.temaService.findById(postagem.tema.id)// isso e para verificar se enontrou o tema

            //     if (!tema)
            //      throw new HttpException('Tema nao foi encontrado', HttpStatus.NOT_FOUND)
            return await this.postagemRepository.save(postagem);
        }

    }

    async update(postagem: Postagem): Promise<Postagem> {

        let buscaPostagem = await this.findById(postagem.id);

        if (!buscaPostagem || !postagem.id) // esta checando se buscaPostagem é diferente de nulo, ou se nao foi passado id vai devolver uma excessao
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        // a diferenca do criar para o atualizar é que no criar nao passsa o id e aqui no atuhalizar passa, este metodo atualiza o objeto inteiro.

        // se o usuario indicou
        if (postagem.tema) { // aqui abaixo foi criado o id do tema, verificando se existe por isso tem o if.

            await this.temaService.findById(postagem.tema.id)// isso e para verificar se enontrou o tema

            return await this.postagemRepository.save(postagem);
        }

        // se o usuariio nao indicou o tema
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        // estamos fazendo o metodo para deletar apenas uma ocorrencia no banco de dados.

        let buscaPostagem = await this.findById(id)

        if (!buscaPostagem)
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND);
        return await this.postagemRepository.delete(id);

    }
}