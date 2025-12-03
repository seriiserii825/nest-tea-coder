import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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

  async update(id: number, dto: UpdateMovieDto): Promise<MovieEntity> {
    const movie = await this.findById(id);
    // will return just fields present in dto, title will be ignored if not provided
    Object.assign(movie, dto);
    try {
      await this.movieRepository.save(movie);
      return movie;
    } catch (error) {
      throw new ConflictException('Movie with this title already exists');
    }
  }

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
