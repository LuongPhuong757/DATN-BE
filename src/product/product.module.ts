import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'entities/product.entity';
import { UserRepository } from 'src/user/user.repository';

// import { MailModule } from '../mail/mail.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './uploads', // Thư mục lưu trữ tệp tải lên
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
