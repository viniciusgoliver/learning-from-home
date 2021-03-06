import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { CategoriasService } from './categorias.service';
import { ReturnCategoriaDto } from './dto/return-categoria.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { UpdateCategoriaDto } from './dto/update-categorias.dto';
import { FindCategoriasQueryDto } from './dto/find-users-query.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Documentação API Categorias')
@Controller('categorias')
@UseGuards(AuthGuard(), RolesGuard)
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  @ApiBody({ type: CreateCategoriaDto})
  @ApiBearerAuth('access-token')
  @Role(UserRole.ADMIN)
  async createCategoria(
    @Body(ValidationPipe) createCategoriaDto: CreateCategoriaDto,
  ): Promise<ReturnCategoriaDto> {
    const categoria = await this.categoriasService.createCategoria(createCategoriaDto);
    return {
      categoria,
      message: 'Categoria cadastrada com sucesso',
    };
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  @Role(UserRole.ADMIN)
  async findCategoriaById(@Param('id') id): Promise<ReturnCategoriaDto> {
    const categoria = await this.categoriasService.findCategoriaById(id);
    return {
      categoria,
      message: 'Categoria encontrado',
    };
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCategoriaDto})
  @ApiBearerAuth('access-token')
  @Role(UserRole.ADMIN)
  async updateCategoria(
    @Body(ValidationPipe) updateCategoriaDto: UpdateCategoriaDto,    
    @Param('id') id: number,
  ) {
    return this.categoriasService.updateCategoria(updateCategoriaDto, id);    
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('access-token')
  @Role(UserRole.ADMIN)
  async deleteCategoria(@Param('id') id: number) {
    await this.categoriasService.deleteCategoria(id);
    return {
      message: 'Categoria removida com sucesso',
    };
  }

  @Get()
  @ApiBody({ type: FindCategoriasQueryDto})
  @ApiBearerAuth('access-token')
  @Role(UserRole.ADMIN)
  async findCategorias(@Query() query: FindCategoriasQueryDto) {
    const found = await this.categoriasService.findCategorias(query);
    return {
      found,
      message: 'Categorias encontradas',
    };
  }
}