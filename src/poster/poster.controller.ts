import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PosterService } from './poster.service';
import { CreatePosterDto } from './dto/create-poster.dto';

@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Get()
  async findAll() {
    return this.posterService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.posterService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreatePosterDto) {
    return this.posterService.create(dto);
  }
}
