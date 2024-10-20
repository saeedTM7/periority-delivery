import { Driver } from './driver.entity';
export declare class Order {
    id: number;
    orderId: string;
    priority: number;
    deliveryTime: Date;
    location: string;
    weight: number;
    cost: number;
    driver: Driver;
}
