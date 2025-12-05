import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ActorsModule } from './actors/actors.module';
import { PosterModule } from './poster/poster.module';

@Module({
  imports: [
    TaskModule,
    MoviesModule,
    ReviewsModule,
    ActorsModule,
    PosterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
