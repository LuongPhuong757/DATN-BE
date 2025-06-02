import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'entities/user.entity';
import { UserScope } from 'src/user/decorators/user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
// import { CreateCartInput, GetListCartInput } from './dto/cart.dto';
import { CartService } from './cart.service';
import {
  AddProductInput,
  GetCartInput,
  UpdateProductInput,
} from './dto/cart.dto';

@ApiTags('Cart')
@Controller('cart')
@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getListProduct(
    @UserScope() user: User,
    @Query() getCart: GetCartInput,
  ) {
    return this.cartService.getCart(getCart, user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createProductInCart(
    @UserScope() user: User,
    @Body() dto: AddProductInput,
  ) {
    return this.cartService.addProductInCart(dto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProductInCarts(
    @UserScope() user: User,
    @Body() dto: UpdateProductInput,
    @Param('id') id: number,
  ) {
    return this.cartService.updateProductInCart(dto, user, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteProduct(@UserScope() user: User, @Param('id') id: number) {
    return this.cartService.deleteProductInCart(user, id);
  }
}
