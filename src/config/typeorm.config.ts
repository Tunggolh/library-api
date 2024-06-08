import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
