// essa classe usaremos para deifinir o modelo de dados.
// essa classe gera instrucoes sql para criar a tabela dentro do banco.

import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";


@Entity({ name: "tb_postagens" })// aqui esatamos criando a tabela personagens. as chaves serve para indicar que é uma propriedade.
export class Postagem {
    // classe postagem, alguns atreibutos relacionado abaixo.

    @PrimaryGeneratedColumn() // essa é a chave primaria autoincremental. decorador tem que ficar encima do atributo, nao deixar espaço.
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Esse comando é feito para nao deixar criar titulo ou texto com valor nulo, como espaço, ou seja, necessario colocar caracteres para criar titulo e texto
    @IsNotEmpty() // essa classe é do validation. E serve para o titulo não pode ser vazio, tem que ser digitado algo, aqui estamos obrigado o usuario a digitar.
    @Column({ length: 100, nullable: false }) // o titulo tem que ter no maximo sem 100 caracteres e o false quer dizer que tem que ser obrigado ao usuario colocar um titulo
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // o titulo nao pode ser vazio, tem que ser digitado algo, aqui estamos obrigado o usuario a digitar.
    @Column({ length: 1000, nullable: false })
    texto: string;

    @UpdateDateColumn() // este decorador preenche a data e a hora automaticamente em nossa tabela.
    data: Date;

        // este lado é o muitos para um, ou seja, muitas postagens possui um tema.
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE" // so tem esse delete aqui por que aqui é a classe filha, ela que tem que ser deletada e nao a principal
    })

    tema: Tema; // essa relacao é do tipo asssociacao, o objeto da classe tema na classe postagem

}