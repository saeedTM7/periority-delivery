import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Post('assign/:driverId')
  async assignOrdersToDriver(@Param('driverId') driverId: number) {
    return this.orderService.assignOrdersToDriver(driverId);
  }

  @Get('report/:driverId')
  async generateDriverReport(@Param('driverId') driverId: number) {
    return this.orderService.generateDriverReport(driverId);
  }
}
