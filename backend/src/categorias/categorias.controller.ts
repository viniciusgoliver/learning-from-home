import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriasService } from './categorias.service';
import { ReturnCategoriaDto } from './dto/return-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  async createCategoria(
    @Body(ValidationPipe) createCategoriaDto: CreateCategoriaDto,
  ): Promise<ReturnCategoriaDto> {
    const categoria = await this.categoriasService.createCategoria(createCategoriaDto);
    return {
      categoria,
      message: 'Categoria cadastrada com sucesso',
    };
  }
}