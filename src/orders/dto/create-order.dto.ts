import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  priority: number;

  @IsDate()
  deliveryTime: Date;

  @IsString()
  location: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  cost: number;
}
