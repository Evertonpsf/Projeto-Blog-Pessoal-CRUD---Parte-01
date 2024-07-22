// essa classe usaremos para deifinir o modelo de dados.

import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "tb_postagens"})// aqui esatamos criando a tabela personagens. as chaves serve para indicar que é uma propriedade.

export class Postagem{
// classe postagem, alguns atreibutos relacionado abaixo.

    @PrimaryGeneratedColumn() // essa é a chave primaria autoincrementa. decorador tem que ficar encima do atributo, nao deixar espaço.
    id: number;

    @IsNotEmpty() // o titulo não pode ser vazio, tem que ser digitado algo, aqui estamos obrigado o usuario a digitar.
    @Column({length: 100, nullable: false}) // o titulo tem que ter no maximo sem 100 caracteres e o false quer dizer que tem que ser obrigado ao usuario colocar um titulo
    titulo: string;

    @IsNotEmpty() // o titulo nao pode ser vazio, tem que ser digitado algo, aqui estamos obrigado o usuario a digitar.
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn() // este decorador preenche a data e a hora automaticamente em nossa tabela.
    data: Date;

}