import {
  Controller, Delete, Get, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'entities/user.entity';
import { GetListProductInput } from 'src/product/dto/product.dto';
import { UserScope } from 'src/user/decorators/user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { OrderService } from './order.service';



@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createOrder(
    @UserScope() user: User,
  ) {
    return this.orderService.paymentOrders(user);
  }


  @Get('statistical')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // // @Roles(ROLE.ADMIN)
  async getStatisticalUser(
    // @Query() getListProductInput: GetListProductInput,
  ) {
    console.log('1')
    return this.orderService.getStatisticaCart()
  }

  @Get('statistical-revenue')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // // @Roles(ROLE.ADMIN)
  async getStatisticalUserRevenue(
    // @Query() getListProductInput: GetListProductInput,
  ) {
    console.log('1')
    return this.orderService.getStatisticalUserRevenue()
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async getOrder(
    @UserScope() user: User,
    @Query() getListProductInput: GetListProductInput
  ) {
    console.log('mmmmmmmmmmm')
    return this.orderService.getOrder(user, getListProductInput);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async deleteOrder(
   @UserScope() user: User,
      //  @Body() dto: CreateProductInput,
       @Param('id') id: number,
  ) {
    console.log('mmmmmmmmmmm')
    return this.orderService.deleteOrder(id);
  }


}