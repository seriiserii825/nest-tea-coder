import { ActorEntity } from 'src/actors/entities/actor.entity';
import { MoviePosterEntity } from 'src/poster/entities/poster.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum Genre {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
}

@Entity('movies')
@Unique(['title'])
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  @Column({
    type: 'int',
    unsigned: true,
  })
  release_year: number;

  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.COMEDY,
  })
  genre: Genre;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @Column({ default: null })
  poster_id: number;

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
