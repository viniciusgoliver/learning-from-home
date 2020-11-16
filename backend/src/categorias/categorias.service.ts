import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaRepository } from './categorias.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(CategoriaRepository)
    private categoriaRepository: CategoriaRepository,
  ) {}
  
  async createCategoria(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaRepository.createCategoria(createCategoriaDto);    
  }
}