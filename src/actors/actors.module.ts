import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { ActorEntity } from './entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [ActorsService],
})
export class ActorsModule {}
