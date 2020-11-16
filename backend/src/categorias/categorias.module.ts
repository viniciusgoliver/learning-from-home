import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaRepository } from './categorias.repository';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaRepository])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}