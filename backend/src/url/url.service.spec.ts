import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { ShortenURLDtos } from './url.dtos';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

jest.mock('nanoid');

const mnanoid = jest.mocked(nanoid);

describe('UrlService', () => {
  let urlService: UrlService;
  let urlRepository: Repository<Url>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: 'UrlRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
    urlRepository = module.get('UrlRepository');
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  describe('shortenUrl', () => {
    const longUrl = 'https://example.com/';
    const nanoCode = 'abc12345';
    const shortUrl = 'http://localhost:8080/abc12345';

    it('should return a shortened URL when given a valid long URL', async () => {
      const dto: ShortenURLDtos = { longUrl };

      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(urlRepository, 'create').mockImplementationOnce(() => ({
        id: 1,
        nanoCode,
        shortUrl,
        longUrl,
      }));
      jest.spyOn(urlRepository, 'save').mockResolvedValueOnce({
        id: 1,
        nanoCode,
        longUrl,
        shortUrl,
      });

      mnanoid.mockReturnValueOnce(nanoCode);

      const result = await urlService.shortenUrl(dto);

      expect(result).toEqual(shortUrl);
      expect(urlRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(urlRepository.create).toHaveBeenCalledWith({
        nanoCode,
        longUrl,
        shortUrl,
      });
      expect(urlRepository.save).toHaveBeenCalledWith({
        id: 1,
        nanoCode,
        longUrl,
        shortUrl,
      });
    });

    it('should return a previously shortened URL when given a URL that has been shortened before', async () => {
      const dto: ShortenURLDtos = { longUrl };

      mnanoid.mockReturnValueOnce(nanoCode);

      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce({
        id: 1,
        nanoCode: nanoCode,
        longUrl,
        shortUrl: shortUrl,
      });
      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce({
        id: 1,
        nanoCode: nanoCode,
        longUrl,
        shortUrl: shortUrl,
      });
      const result = await urlService.shortenUrl(dto);
      expect(result).toEqual(shortUrl);
    });

    it('should regenerate nanoCode if it already exists', async () => {
      const dto: ShortenURLDtos = { longUrl };

      mnanoid.mockReturnValueOnce(nanoCode);
      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce({
        id: 1,
        nanoCode: nanoCode,
        longUrl: 'https://google.com/',
        shortUrl: shortUrl,
      });

      mnanoid.mockReturnValueOnce('12345abc');
      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(urlRepository, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(urlRepository, 'create').mockImplementationOnce(() => ({
        id: 2,
        nanoCode: '12345abc',
        shortUrl: 'http://localhost:8080/12345abc',
        longUrl,
      }));
      jest.spyOn(urlRepository, 'save').mockResolvedValueOnce({
        id: 2,
        nanoCode: '12345abc',
        longUrl,
        shortUrl: 'http://localhost:8080/12345abc',
      });
      const result = await urlService.shortenUrl(dto);
      expect(result).toEqual('http://localhost:8080/12345abc');
    });

    it('should throw a BadRequestException when given an invalid long URL', async () => {
      const dto: ShortenURLDtos = { longUrl: 'invalid-url' };

      await expect(urlService.shortenUrl(dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an InternalServerErrorException when there is an error while creating a shortened URL', async () => {
      const dto: ShortenURLDtos = { longUrl };

      jest.spyOn(urlRepository, 'findOneBy').mockRejectedValueOnce(new Error());

      await expect(urlService.shortenUrl(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
