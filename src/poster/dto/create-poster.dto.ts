import { IsString } from 'class-validator';

export class CreatePosterDto {
  @IsString()
  url: string;
}
