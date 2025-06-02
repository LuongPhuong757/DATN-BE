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
import { OrderByProduct, TypeProduct } from '../product.constants';

export class CreateProductInput {
  @ApiProperty({ default: 'phuong.luong@sotatek.com' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  name: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ default: 1 })
  @IsEnum(TypeProduct)
  @IsOptional()
  category: TypeProduct;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsOptional()
  discount: number;

  @ApiProperty({ default: 'phuong.luong@sotatek.com' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  description: string;

  // @ApiProperty({ default: [1, 2] })
  // @IsArray()
  // @IsOptional()
  // size: number[];

  @ApiProperty({ default: ['abc.jpg', 'png.png'] })
  @IsString()
  @IsOptional()
  images: string;

  @ApiProperty({ default: 'phuong.luong@sotatek.com' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  material: string;

  @ApiProperty({ default: 10 })
  @IsNumber()
  @IsOptional()
  amount: number;

  // @ApiProperty({ default: 1 })
  // @IsNumber()
  // @IsOptional()
  // guarantee: number;
}

export class GetListProductInput {
  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ default: 10, required: false })
  @IsString()
  @IsOptional()
  key: string;

  @ApiProperty({ default: 1, required: false })
  @IsEnum(TypeProduct)
  @IsOptional()
  type: TypeProduct;

  @ApiProperty({ default: 1, required: false })
  @IsEnum(OrderByProduct)
  @IsOptional()
  orderBy: OrderByProduct;

  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @IsNumber()
  status: number;
}
