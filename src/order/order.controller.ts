import {
  Controller, Delete, Get, Param, Post, Query, UseGuards, Patch,
  Put,
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
  async getStatisticalUser(
  ) {
    return this.orderService.getStatisticaCart()
  }

  @Get('statistical-revenue')
  async getStatisticalUserRevenue(
  ) {
    return this.orderService.getStatisticalUserRevenue()
  }

  @Get()
  async getOrder(
    @UserScope() user: User,
    @Query() getListProductInput: GetListProductInput
  ) {
    return this.orderService.getOrder(user, getListProductInput);
  }

  @Delete(':id')
  async deleteOrder(
   @UserScope() user: User,
       @Param('id') id: number,
  ) {
    return this.orderService.deleteOrder(id);
  }

  @Put(':id/ship')
  async updateOrderStatus(
    @Param('id') id: number,
  ) {
    return this.orderService.updateOrderStatus(id);
  }
}