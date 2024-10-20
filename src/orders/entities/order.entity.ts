import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Driver } from './driver.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  priority: number;

  @Column('timestamp')
  deliveryTime: Date;

  @Column()
  location: string;

  @Column()
  weight: number;

  @Column()
  cost: number;

  @ManyToOne(() => Driver, (driver) => driver.orders)
  driver: Driver;
}
