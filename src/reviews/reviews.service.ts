import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  // async create(dto: CreateReviewDto): Promise<ReviewEntity> {
  //   const movie = await this.movieService.findById(dto.movie_id);
  //   const review = this.reviewRepository.create({ ...dto, movie });
  //   try {
  //     return await this.reviewRepository.save(review);
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : 'Unknown error';
  //     throw new InternalServerErrorException(
  //       `Failed to create review: ${message}`,
  //     );
  //   }
  // }
}
