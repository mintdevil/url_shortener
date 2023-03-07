import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class ShortenURLDtos {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  longUrl: string;
}
