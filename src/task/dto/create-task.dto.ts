import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StartWith } from '../decorators/start-with.decorator';
export class CreateTaskDto {
  @IsString()
  @StartWith('Task:')
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
  @IsUrl({}, { message: 'websiteUrl must be a valid URL' })
  websiteUrl: string;
}
