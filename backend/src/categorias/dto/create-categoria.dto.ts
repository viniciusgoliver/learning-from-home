import {
  IsNotEmpty,
  MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @IsNotEmpty({
    message: 'Informe o nome da categoria',
  })
  @ApiProperty()
  nome: string;

  @IsNotEmpty({
    message: 'Informe a descrição da categoria',
  })
  @MaxLength(300, {
    message: 'A descrição deve ter menos de 300 caracteres',
  })
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  status: boolean;
}