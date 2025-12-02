import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm-config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TaskModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
