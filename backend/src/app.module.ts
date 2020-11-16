import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}