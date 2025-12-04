import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { ActorsModule } from 'src/actors/actors.module';
import { PosterModule } from 'src/poster/poster.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    ActorsModule,
    PosterModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
