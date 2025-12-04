import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  async findAll() {
    return this.actorsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateActorDto) {
    return this.actorsService.create(dto);
  }
}
