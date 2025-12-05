import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviePosterEntity } from './entities/poster.entity';
import { Repository } from 'typeorm';
import { CreatePosterDto } from './dto/create-poster.dto';

@Injectable()
export class PosterService {
  // constructor(
  //   @InjectRepository(MoviePosterEntity)
  //   private readonly posterRepository: Repository<MoviePosterEntity>,
  // ) {}
  //
  // async findAll(): Promise<MoviePosterEntity[]> {
  //   return this.posterRepository.find();
  // }
  //
  // async findById(id: number): Promise<MoviePosterEntity> {
  //   const poster = await this.posterRepository.findOne({
  //     where: { id },
  //   });
  //   if (!poster) {
  //     throw new NotFoundException(`Poster with ID ${id} not found`);
  //   }
  //   return poster;
  // }
  //
  // async create(dto: CreatePosterDto): Promise<MoviePosterEntity> {
  //   const poster = this.posterRepository.create(dto);
  //   try {
  //     return this.posterRepository.save(poster);
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to create poster: ${error instanceof Error ? error.message : 'Unknown error'}`,
  //     );
  //   }
  // }
}
