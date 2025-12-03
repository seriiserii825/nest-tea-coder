import {
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @MaxLength(100)
  text: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsInt()
  movie_id: number;
}
