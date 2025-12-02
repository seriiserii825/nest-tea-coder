import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'secret_pass',
  database: process.env.DB_NAME || 'nestjs_course',
  // entities: ['dist/**/*.entity.js', 'src/**/*.entity.js'],
  entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/db/migrations/*.js'],
  // seeds: ['dist/src/db/seeders/*.js'],
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(typeormConfig);
export default dataSource;
