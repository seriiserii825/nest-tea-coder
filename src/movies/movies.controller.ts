import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {CreateMovieDto} from './dto/create-movie.dto';
import {MovieEntity} from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMovieDto): Promise<MovieEntity> {
    return this.moviesService.create(dto);
  }
}
