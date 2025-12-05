import { Body, Controller, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  // constructor(private readonly reviewsService: ReviewsService) {}
  //
  // @Post()
  // async createReview(@Body() dto: CreateReviewDto) {
  //   return this.reviewsService.create(dto);
  // }
}
