import { Controller, Post, Body, Get, Res, Param } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDtos } from './url.dtos';

@Controller()
export class UrlController {
  constructor(private service: UrlService) {}

  @Post('shortenUrl')
  shortenUrl(
    @Body()
    url: ShortenURLDtos,
  ) {
    return this.service.shortenUrl(url);
  }

  @Get(':code')
  async redirect(
    @Res() res,
    @Param('code')
    code: string,
  ) {
    const url = await this.service.redirect(code);

    return res.redirect(url.longUrl);
  }
}
