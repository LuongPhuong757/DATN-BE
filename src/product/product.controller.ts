import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'entities/user.entity';
import { ErrorDto } from 'src/shared/dto/response/error.dto';
import { UserScope } from 'src/user/decorators/user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { CreateProductInput, GetListProductInput } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getListProduct(
    @UserScope() user: User,
    @Query() getListProductInput: GetListProductInput,
  ) {
    return this.productService.getListProduct(getListProductInput);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getProductDetail(
    @UserScope() user: User,
    @Param('id') id: number
  ) {
    return this.productService.getProductDetail(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async createProduct(
    @UserScope() user: User,
    @Body() dto: CreateProductInput,
  ) {
    return this.productService.createProduct(dto);
  }

  @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async updateProduct(
    @UserScope() user: User,
    @Body() dto: CreateProductInput,
    @Param('id') id: number,
  ) {
    return this.productService.updateProduct(dto, id);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async deleteProduct(
    @UserScope() user: User,
    @Body() dto: CreateProductInput,
    @Param('id') id: number,
  ) {
    return this.productService.deleteProduct(id);
  }
}
