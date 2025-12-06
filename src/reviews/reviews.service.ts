import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    try {
      const movie = await this.prismaService.movie.findUnique({
        where: { id: dto.movie_id },
      });
      if (!movie) {
        throw new InternalServerErrorException(
          `Movie with ID ${dto.movie_id} not found`,
        );
      }
      const review = this.prismaService.review.create({
        data: {
          text: dto.text,
          rating: dto.rating,
          movie_id: movie.id,
        }
      });
      return review;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to create review: ${message}`,
      );
    }
  }
}
