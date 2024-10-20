import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Driver } from './entities/driver.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async assignOrdersToDriver(driverId: number): Promise<void> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
      relations: ['orders'],
    });
    const orders = await this.orderRepository.find({
      order: { priority: 'DESC', deliveryTime: 'ASC' },
    });

    // Assign top priority orders to the driver
    driver.orders = orders.slice(0, 5); // Example: Assign top 5 orders
    await this.driverRepository.save(driver);
  }

  async generateDriverReport(driverId: number): Promise<any> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
      relations: ['orders'],
    });

    const totalCost = driver.orders.reduce((sum, order) => sum + order.cost, 0);
    const avgDeliveryTime = this.calculateAverageDeliveryTime(driver.orders);

    return {
      totalCost,
      avgDeliveryTime,
      // Other metrics...
    };
  }

  calculateAverageDeliveryTime(orders: Order[]): number {
    if (orders.length === 0) {
      return 0; // If no orders, return 0 to avoid division by zero
    }
    const now = new Date(); // Or use a different reference time if needed
    // Sum up the delivery time differences (in milliseconds)
    const totalTimeDiffInMs = orders.reduce((acc, order) => {
      const deliveryTime = new Date(order.deliveryTime).getTime(); // Get delivery time in milliseconds
      const timeDiff = deliveryTime - now.getTime(); // Difference in milliseconds
      return acc + timeDiff;
    }, 0);
    // Calculate average time in milliseconds
    const avgTimeInMs = totalTimeDiffInMs / orders.length;
    // Convert milliseconds to hours (or minutes if preferred)
    const avgTimeInHours = avgTimeInMs / (1000 * 60 * 60); // Convert ms to hours
    return avgTimeInHours;
  }
}
