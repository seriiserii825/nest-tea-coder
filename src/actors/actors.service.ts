import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Actor} from '@prisma/client';
@Injectable()
export class ActorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Actor[]> {
    return this.prismaService.actor.findMany();
  }

  async findByIds(ids: number[]): Promise<Actor[]> {
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: ids,
        },
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
  async create(dto: CreateActorDto): Promise<Actor> {
    try {
      const actor = await this.prismaService.actor.create({
        data: {
          name: dto.name,
        },
      });
      return actor;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to create actor: ${message}`,
      );
    }
  }
}
