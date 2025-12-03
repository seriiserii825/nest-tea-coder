import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MoviesService,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const movie = await this.movieService.findById(dto.movie_id);
    const review = this.reviewRepository.create({ ...dto, movie });
    try {
      return await this.reviewRepository.save(review);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to create review: ${message}`,
      );
    }
  }
}
