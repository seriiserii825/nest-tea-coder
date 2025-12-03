import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {CreateMovieDto} from './dto/create-movie.dto';
import {MovieEntity} from './entities/movie.entity';
import {UpdateMovieDto} from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateMovieDto): Promise<MovieEntity> {
    return this.moviesService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.moviesService.update(id, dto);
  }
}
