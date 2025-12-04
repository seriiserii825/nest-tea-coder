import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviePosterEntity } from './entities/poster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoviePosterEntity])],
  controllers: [PosterController],
  providers: [PosterService],
  exports: [PosterService],
})
export class PosterModule {}
