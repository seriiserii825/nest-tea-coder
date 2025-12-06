import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviePosterEntity } from './entities/poster.entity';
import { Repository } from 'typeorm';
import { CreatePosterDto } from './dto/create-poster.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoviePoster } from '@prisma/client';

@Injectable()
export class PosterService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MoviePoster[]> {
    return this.prismaService.moviePoster.findMany();
  }

  async findById(id: number): Promise<MoviePoster> {
    const poster = await this.prismaService.moviePoster.findUnique({
      where: { id },
    });
    if (!poster) {
      throw new NotFoundException(`Poster with ID ${id} not found`);
    }
    return poster;
  }

  async create(dto: CreatePosterDto): Promise<MoviePoster> {
    try {
      const poster = this.prismaService.moviePoster.create({
        data: {
          url: dto.url,
        },
      });
      return poster;
    } catch (error) {
      throw new Error(
        `Failed to create poster: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
