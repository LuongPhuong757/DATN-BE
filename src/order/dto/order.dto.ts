import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';


export class CreateOrderInput {

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  userName: string;

  @ApiProperty({ example: '0961452042' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Ha noi' })
  @IsString()
  address: string;
}

export class ProductInCart {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  price: number;
}
