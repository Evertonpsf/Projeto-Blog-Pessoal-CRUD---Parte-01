import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";


@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { } 


    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations:{
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema> {


        let buscaTema = await this.temaRepository.findOne({// aqui estamos buscando uma postagem, por id por isso passamos o id
            where: {
                id
            },
            relations:{
                postagem: true
            }
        })

        if (!buscaTema)
            throw new HttpException('O Tema nao foi encontrado!', HttpStatus.NOT_FOUND);

        return buscaTema;

    }

    async findByDescricao(descricao: string): Promise<Tema[]> { // o colchete indica que pode ser que traga mais de um titulo, serve para mostrar os que puxarem.
        // estamos fazendo o metodo para buscar apenas uma ocorrencia no banco de dados, no caso o titulo.

        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) // usamos o ILike pois é insensitivo, assim busca a descricao independente da forma que esteja escrito, em maisculo ou minusculo.
            },
            relations:{
                postagem: true
            }
        })

    }
    async create(tema: Tema): Promise<Tema> { // aqui estamos criando o metodo de tema, para fazer um tema
        return await this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema> {

        let buscaTema = await this.findById(tema.id);

        if (!buscaTema || !tema.id) // esta checando se buscaTema é diferente de nulo, ou se nao foi passado id vai devolver uma excessao
            throw new HttpException('O Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        // a diferenca do criar para o atualizar é que no criar nao passsa o id e aqui no atualizar passa, este metodo atualiza o objeto inteiro.

        return await this.temaRepository.save(tema);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        // estamos fazendo o metodo para deletar apenas uma ocorrencia no banco de dados.

        let buscaTema = await this.findById(id)

        if (!buscaTema)
            throw new HttpException('O Tema não foi encontrada!', HttpStatus.NOT_FOUND);
        return await this.temaRepository.delete(id);

    }
}