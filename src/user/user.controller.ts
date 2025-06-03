import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'entities/user.entity';
import { GetListProductInput } from 'src/product/dto/product.dto';
import { ErrorDto } from 'src/shared/dto/response/error.dto';
import { ROLE } from './constants';
import { Roles } from './decorators/role.decorator';
import { LoginInput } from './dto/login.dto';
import { LoginResponseDto } from './dto/response/login.response';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  @ApiOperation({
    summary: 'User signup first step API',
  })
  @ApiBadRequestResponse({ description: 'Fail', type: ErrorDto })
  @ApiOkResponse({ description: 'Success', type: User })
  async signupFirstStep(@Body() dto: SignupDto) {
    const registeredUser = await this.userService.signup(dto);
    const { password, ...registeredUserWithoutPassword } = registeredUser;
    return registeredUserWithoutPassword;
  }

  @Post('login')
  @ApiOkResponse({ description: 'Success', type: LoginResponseDto })
  async loginExternalWallet(@Body() credential: LoginInput) {
    const user = await this.userService.getUser(
      credential.email,
      credential.password,
    );
    const { password, ...userWithoutPassword } = user;
    const authToken = await this.userService.login(user);
    return { ...authToken, user: userWithoutPassword };
  }

  @Get('list')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ROLE.ADMIN)
  async getListUser(
    @Query() getListProductInput: GetListProductInput,
  ) {
    const { page, limit } = getListProductInput
    let conditionPage = {}
    if (page && limit) {
      const skip = (page - 1) * limit;
      conditionPage = {
        take: limit,
        skip: skip,
      }
    }
    const [listUser, total] = await User.findAndCount({
      ...conditionPage,
    });
    return { listUser, total };
  }

  @Get('statistical')
  async getStatisticalUser(
  ) {
    return this.userService.getStatisticalUser()
  }

  @Get(':id')
  async getUser(
    @Param('id') id: number,
  ) {
    return User.findOne({where: {
      id
    }})
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(
    @Param('id') id: number,
  ) {
    await User.delete(id)
    return JSON.stringify('success')
  }
}
