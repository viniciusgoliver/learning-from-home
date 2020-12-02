import { FindCategoriasQueryDto } from './dto/find-users-query.dto';
import {
  Injectable,  
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaRepository } from './categorias.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './categoria.entity';
import { UpdateCategoriaDto } from './dto/update-categorias.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(CategoriaRepository)
    private categoriaRepository: CategoriaRepository,
  ) {}

  async createCategoria(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaRepository.createCategoria(createCategoriaDto);    
  }

  async findCategoriaById(categoriaId: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne(categoriaId, {
      select: ['nome', 'descricao', 'status', 'id'],
    });

    if (!categoria) throw new NotFoundException('Categoria não encontrada');

    return categoria;
  }

  /* async updateCategoria(updateCategoriaDto: UpdateCategoriaDto, id: number): Promise<Categoria> {
    const categoria = await this.findCategoriaById(id);
    const { nome, descricao, status } = updateCategoriaDto;
    categoria.nome = nome ? nome : categoria.nome;
    categoria.descricao = descricao ? descricao : categoria.descricao;
    categoria.status = status === undefined ? categoria.status : status;
    try {
      await categoria.save();
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  } */

  async updateCategoria(updateCategoriaDto: UpdateCategoriaDto, id: number): Promise<Categoria> {
    const result = await this.categoriaRepository.update({ id }, updateCategoriaDto);
    if (result.affected > 0) {
      const categoria = await this.findCategoriaById(id);
      return categoria;
    } else {
      throw new NotFoundException('Categoria não encontrada');
    }
  }

  async deleteCategoria(categoriaId: number) {
    const result = await this.categoriaRepository.delete({ id: categoriaId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrada categoria com o ID informado',
      );
    }
  }

  async findCategorias(
    queryDto: FindCategoriasQueryDto,
  ): Promise<{ categorias: Categoria[]; total: number }> {
    const categorias = await this.categoriaRepository.findCategorias(queryDto);
    return categorias;
  }
}