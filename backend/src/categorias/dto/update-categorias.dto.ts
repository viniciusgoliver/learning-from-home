import { IsString, IsOptional } from 'class-validator';
export class UpdateCategoriaDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de categoria válida',
  })
  nome: string;

  @IsOptional()
  descricao: string;

  @IsOptional()
  status: boolean;
}