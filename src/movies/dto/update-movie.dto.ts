import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsInt()
  @IsOptional()
  @Min(1888)
  @Max(new Date().getFullYear())
  release_year: number;
}
