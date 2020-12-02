import { FindCategoriasQueryDto } from './dto/find-users-query.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaRepository } from './../categorias/categorias.repository';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { NotFoundException, } from '@nestjs/common';

const mockCategoriaRepository = () => ({
  createCategoria: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  findCategorias: jest.fn(),
  update: jest.fn(),
});

describe('CategoriasService', () => {
  let categoriaRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: CategoriaRepository,
          useFactory: mockCategoriaRepository,
        },
      ],
    }).compile();

    categoriaRepository = await module.get<CategoriaRepository>(CategoriaRepository);
    service = await module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoriaRepository).toBeDefined();
  });

  describe('createCategoria', () => {
    let mockCreateCategoriaDto: CreateCategoriaDto;

    beforeEach(() => {
      mockCreateCategoriaDto = {
        nome: "Categoria 1",
        descricao: "Teste de descricao de categoria 1",
        status: true
      };
    });

    it('should create an categoria', async () => {
      categoriaRepository.createCategoria.mockResolvedValue('mockCategoria');
      const result = await service.createCategoria(mockCreateCategoriaDto);

      expect(categoriaRepository.createCategoria).toHaveBeenCalledWith(
        mockCreateCategoriaDto
      );
      expect(result).toEqual('mockCategoria');
    });
  });

  describe('findCategoriaById', () => {
    it('should return the found categoria', async () => {
      categoriaRepository.findOne.mockResolvedValue('mockCategoria');
      expect(categoriaRepository.findOne).not.toHaveBeenCalled();

      const result = await service.findCategoriaById('mockId');
      const select = ['nome', 'descricao', 'status', 'id'];
      expect(categoriaRepository.findOne).toHaveBeenCalledWith('mockId', { select });
      expect(result).toEqual('mockCategoria');
    });

    it('should throw an error as categoria is not found', async () => {
      categoriaRepository.findOne.mockResolvedValue(null);
      expect(service.findCategoriaById('mockId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCategoria', () => {
    it('should return affected > 0 if categoria is deleted', async () => {
      categoriaRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteCategoria('mockId');
      expect(categoriaRepository.delete).toHaveBeenCalledWith({ id: 'mockId' });
    });

    it('should throw an error if no categoria is deleted', async () => {
      categoriaRepository.delete.mockResolvedValue({ affected: 0 });

      expect(service.deleteCategoria('mockId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findCategorias', () => {
    it('should call the findCategorias method of the categoriaRepository', async () => {
      categoriaRepository.findCategorias.mockResolvedValue('resultOfsearch');
      const mockFindCategoriasQueryDto: FindCategoriasQueryDto = {
        nome: '',
        descricao: '',
        status: true,
        sort: 'ASC',
        page: 1,
        limit: 10,
      };
      const result = await service.findCategorias(mockFindCategoriasQueryDto);
      expect(categoriaRepository.findCategorias).toHaveBeenCalledWith(
        mockFindCategoriasQueryDto,
      );
      expect(result).toEqual('resultOfsearch');
    });
  });

  describe('updateCategoria', () => {
    it('should return affected > 0 if categoria data is updated and return the new categoria', async () => {
      categoriaRepository.update.mockResolvedValue({ affected: 1 });
      categoriaRepository.findOne.mockResolvedValue('mockCategoria');

      const result = await service.updateCategoria('mockUpdateCategoriaDto', 'mockId');
      expect(categoriaRepository.update).toHaveBeenCalledWith(
        { id: 'mockId' },
        'mockUpdateCategoriaDto',
      );
      expect(result).toEqual('mockCategoria');
    });

    it('should throw an error if no row is affected in the DB', async () => {
      categoriaRepository.update.mockResolvedValue({ affected: 0 });

      expect(service.updateCategoria('mockUpdateCategoriaDto', 'mockId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });    
});