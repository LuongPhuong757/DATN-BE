import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
} from 'class-validator';


export class CreateOrderInput {
  @ApiProperty({
    example: [{
      productId: 1,
      amount: 1,
      price: 1000
    }]
  })
  @IsArray()
  listProduct: ProductInCart;
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
