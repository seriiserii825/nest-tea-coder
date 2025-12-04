import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from './entities/actor.entity';
import { In, Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<ActorEntity[]> {
    return this.actorRepository.find();
  }

  async findByIds(ids: number[]): Promise<ActorEntity[]> {
    const actors = await this.actorRepository.find({
      where: {
        id: In(ids),
      },
    });
    if (actors.length === 0) {
      throw new InternalServerErrorException(
        'No actors found with the provided IDs',
      );
    }
    if (actors.length !== ids.length) {
      const foundIds = actors.map((actor) => actor.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new InternalServerErrorException(
        `Actors not found with IDs: ${notFoundIds.join(', ')}`,
      );
    }
    return actors;
  }
  async create(dto: CreateActorDto): Promise<ActorEntity> {
    try {
      const actor = this.actorRepository.create(dto);
      return await this.actorRepository.save(actor);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to create actor: ${message}`,
      );
    }
  }
}
