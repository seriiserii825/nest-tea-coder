import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ActorsModule } from 'src/actors/actors.module';
import { PosterModule } from 'src/poster/poster.module';

@Module({
  imports: [ActorsModule, PosterModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
