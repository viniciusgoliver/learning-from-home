import { EntityRepository, Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {
  async createCategoria(
    createCategoriaDto: CreateCategoriaDto
  ): Promise<Categoria> {
    const { nome, descricao } = createCategoriaDto;

    const categoria = this.create();
    categoria.nome = nome;
    categoria.descricao = descricao;
    categoria.status = true;
    
    try {
      await categoria.save();
      return categoria;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Nome de categoria já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o categoria no banco de dados',
        );
      }
    }
  }
}