import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    assignOrdersToDriver(driverId: number): Promise<void>;
    generateDriverReport(driverId: number): Promise<any>;
}
