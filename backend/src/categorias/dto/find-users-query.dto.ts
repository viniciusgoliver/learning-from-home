import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindCategoriasQueryDto extends BaseQueryParametersDto {
  nome: string;
  descricao: string;
  status: boolean;
}