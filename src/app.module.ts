import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { BullModule } from '@nestjs/bull';
// import { UserOtpModule } from './user-otp/user-otp.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StaticModule } from './static/static.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'test',
      username: 'root',
      password: 'Phuongkya123!',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // Timezone configured on the MySQL server.
      // This is used to typecast server date/time values to JavaScript Date object and vice versa.
      timezone: 'Z',
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    // UserOtpModule,
    ProductModule,
    StaticModule,
    CartModule,
    OrderModule,
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
      }),
      global: true,
    },
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
