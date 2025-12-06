import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateActorDto {
  @IsString()
  name: string;

  // Связать с уже существующими фильмами по id
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  movies?: number[];
}
