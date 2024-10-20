import { DataSource } from 'typeorm';
import { Order } from './orders/entities/order.entity'; // Make sure to adjust the path
import { Driver } from './orders/entities/driver.entity'; // Adjust the path if needed

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1378',
  database: 'orders',
  synchronize: false, // Disable auto-sync since you are using migrations
  logging: true,
  entities: [Order, Driver],
  migrations: ['./migrations/*.ts'], // Migration folder
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });