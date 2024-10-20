import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'orders',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrderModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Enables validation globally
    },
  ],
})
export class AppModule {}
