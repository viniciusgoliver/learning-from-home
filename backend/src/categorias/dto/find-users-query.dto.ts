import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindCategoriasQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  status: boolean;
}