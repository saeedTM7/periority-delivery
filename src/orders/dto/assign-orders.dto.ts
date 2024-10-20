import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignOrdersDto {
  @IsNumber()
  @IsNotEmpty()
  driverId: number;

  @IsNotEmpty()
  orderIds: number[];
}
