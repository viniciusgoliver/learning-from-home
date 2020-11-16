import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaRepository } from './categorias.repository';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}