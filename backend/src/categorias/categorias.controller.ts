import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriasService } from './categorias.service';
import { ReturnCategoriaDto } from './dto/return-categoria.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';

@Controller('categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
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