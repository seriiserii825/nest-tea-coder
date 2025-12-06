import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from 'generated/prisma';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Movie[]> {
    return this.prismaService.movie.findMany({
      include: {
        actors: true,
        poster: true,
      },
    });
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    try {
      const actors = await this.prismaService.actor.findMany({
        where: {
          id: {
            in: dto.actor_ids,
          },
        },
      });
      if (actors.length === 0) {
        throw new NotFoundException('No actors found with the provided IDs');
      }

      const poster = await this.prismaService.moviePoster.findUnique({
        where: { id: dto.poster_id },
      });

      const movie = this.prismaService.movie.create({
        data: {
          title: dto.title,
          release_year: dto.release_year,
          actors: {
            connect: actors.map((actor) => ({ id: actor.id })),
          },
          poster: {
            connect: { id: poster?.id },
          },
        },
        include: {
          actors: true,
          poster: true,
        },
      });

      return movie;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      throw new HttpException(`Failed to create movie: ${message}`, 500);
    }
  }

  async update(id: number, dto: UpdateMovieDto): Promise<void> {
    const movie = await this.findById(id);
    Object.assign(movie, dto);
    try {
      await this.prismaService.movie.update({
        where: { id },
        data: {
          title: dto.title,
          release_year: dto.release_year,
        },
      });
    } catch (error) {
      throw new ConflictException('Movie with this title already exists');
    }
  }

  async findById(id: number): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        actors: true,
        poster: true,
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async delete(id: number): Promise<void> {
    const movie = await this.findById(id);
    try {
      await this.prismaService.movie.delete({
        where: { id: movie.id },
      });
    } catch (error) {
      throw new HttpException('Failed to delete the movie', 500);
    }
  }
}
