import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoriaDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de categoria válida',
  })
  @ApiProperty()
  nome: string;

  @IsOptional()
  @ApiProperty()
  descricao: string;

  @IsOptional()
  @ApiProperty()
  status: boolean;
}