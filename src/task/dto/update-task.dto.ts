import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @Length(5, 20, { message: 'Title must be between 5 and 20 characters' })
  @IsNotEmpty()
  @ApiProperty({ example: 'Learn NestJS', description: 'Task title' })
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Task completion status',
  })
  isCompleted: boolean;
}
