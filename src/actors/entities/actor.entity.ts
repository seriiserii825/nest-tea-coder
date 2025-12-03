import { MovieEntity } from 'src/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['name'])
@Entity('actors')
export class ActorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 80 })
  name: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.actors)
  movies: MovieEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
