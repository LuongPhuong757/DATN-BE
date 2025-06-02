import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TypeUpdateProduct } from '../cart.constants';

export class AddProductInput {
  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  @IsOptional()
  productId: number;

  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  @IsOptional()
  amount: number;
}

export class UpdateProductInput {
  @ApiProperty({ default: 1 })
  @IsEnum(TypeUpdateProduct)
  @IsOptional()
  type: TypeUpdateProduct;
}

export class GetCartInput {
  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  //   @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  //   @IsOptional()
  @Type(() => Number)
  limit: number;
}
