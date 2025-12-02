import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find({
      order: {
        created_at: 'DESC',
      },
      where: {
        release_year: 2022
      }
    });
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const movie = this.movieRepository.create(dto);
    try {
      await this.movieRepository.save(movie);
      return movie;
    } catch (error) {
      throw new HttpException('Movie with this title already exists', 400);
    }
  }
}
