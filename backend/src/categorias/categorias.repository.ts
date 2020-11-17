import { FindCategoriasQueryDto } from './dto/find-users-query.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {
  async findCategorias(
    queryDto: FindCategoriasQueryDto,
  ): Promise<{ categorias: Categoria[]; total: number }> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { nome, status } = queryDto;
    const query = this.createQueryBuilder('categoria');
    query.where('categoria.status = :status', { status });

    if (nome) {
      query.andWhere('categoria.nome ILIKE :nome', { nome: `%${nome}%` });
    }
    
    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['categoria.nome', 'categoria.descricao', 'categoria.status']);

    const [categorias, total] = await query.getManyAndCount();

    return { categorias, total };
  }

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