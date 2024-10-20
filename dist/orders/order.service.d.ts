import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Driver } from './entities/driver.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private readonly orderRepository;
    private readonly driverRepository;
    constructor(orderRepository: Repository<Order>, driverRepository: Repository<Driver>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    assignOrdersToDriver(driverId: number): Promise<void>;
    generateDriverReport(driverId: number): Promise<any>;
    calculateAverageDeliveryTime(orders: Order[]): number;
}
