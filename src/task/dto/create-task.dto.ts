import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
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
  @ApiProperty({ example: 'Learn NestJS', description: 'Task title' })
  title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'Task completion status',
    required: false,
  })
  isCompleted: boolean;

  @IsNumber()
  @IsOptional()
  priority: number;
}
