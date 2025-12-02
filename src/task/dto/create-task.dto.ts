import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
