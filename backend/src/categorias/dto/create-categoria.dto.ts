import {
  IsNotEmpty,
  MaxLength
} from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({
    message: 'Informe o nome da categoria',
  })
  nome: string;

  @IsNotEmpty({
    message: 'Informe a descrição da categoria',
  })
  @MaxLength(300, {
    message: 'A descrição deve ter menos de 300 caracteres',
  })
  descricao: string;

  status: boolean;
}