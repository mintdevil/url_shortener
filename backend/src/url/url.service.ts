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

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async shortenUrl(url: ShortenURLDtos) {
    const { longUrl } = url;

    // check if input is a valid url
    if (!isURL(longUrl)) {
      throw new BadRequestException('Input is not a valid URL.');
    }

    // generate unique code
    let nanoCode = nanoid(8);
    const baseURL = 'http://localhost:8080';

    try {
      // check if url has already been shortened before
      let url = await this.urlRepository.findOneBy({ longUrl });
      if (url) return url.shortUrl;

      // check if nanoCode already exists in the database
      let code = await this.urlRepository.findOneBy({ nanoCode });
      while (code) {
        // generate new code if it already exists
        nanoCode = nanoid(8);
        code = await this.urlRepository.findOneBy({ nanoCode });
      }

      // if shortened url doesn't exist, create a new one
      const shortUrl = `${baseURL}/${nanoCode}`;

      // add new shortened url to database
      url = this.urlRepository.create({
        nanoCode,
        longUrl,
        shortUrl,
      });

      this.urlRepository.save(url);
      return url.shortUrl;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while shortening the URL. Please try again.',
      );
    }
  }

  async redirect(nanoCode: string) {
    let url = null;
    try {
      // check if url exists in the database using nanoCode
      url = await this.urlRepository.findOneBy({ nanoCode });
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while redirecting. Please try again.',
      );
    }

    if (!url) {
      throw new NotFoundException('URL does not exist.');
    }

    return url;
  }
}
