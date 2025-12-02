import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @Length(5, 20, { message: 'Title must be between 5 and 20 characters' })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
