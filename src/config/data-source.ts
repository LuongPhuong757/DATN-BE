import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '071221',
  database: process.env.DB_DATABASE || 'interior',
  entities: [join(__dirname, '../../entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../migrations/*{.ts,.js}')],
  synchronize: false,
}); 