import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }