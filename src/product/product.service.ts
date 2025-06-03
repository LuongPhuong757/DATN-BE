import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'entities/user.entity';
// import { OTP_TYPE } from 'src/user-otp/constants';
// import { UserOtpService } from 'src/user-otp/user-otp.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Product } from 'entities/product.entity';
import { CreateProductInput, GetListProductInput } from './dto/product.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { Image } from 'entities/image.entity';
import { OrderByProduct } from './product.constants';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { ROLE } from 'src/user/constants';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) { }

  async getListProduct(getListProductInput: GetListProductInput) {
    const { page, limit, type, orderBy, key, status } = getListProductInput;
    let condition = {}
    if (type) {
      condition = {
        category: type
      }
    }
    if (status) {
      condition = {
        ...condition,
        status
      }
    }
    let conditionOrderBy = {}
    if (orderBy == OrderByProduct.OUTSTANDING) {
      conditionOrderBy = {
        order: { price: 'DESC' },
      }
    }
    let conditionPage = {}
    if (page && limit) {
      const skip = (page - 1) * limit;
      conditionPage = {
        take: limit,
        skip: skip,
      }
    }
    if (key) {
      condition = {
        ...condition,
        name: Like(`%${key}%`)
      }
    }
    const [listProduct, total] = await this.repository.findAndCount({
      where: {
        ...condition,
      },

      ...conditionOrderBy,
      ...conditionPage
    });
    const totalProduct = listProduct.reduce((total, product) => {
      return total + product.amount
    }, 0)
    return { total, listProduct, totalProduct };
  }

  async createProduct(dto: CreateProductInput) {
    const { images, ...createProduct } = dto;
    let condition = {}
    if (images) {
      let imageArray = JSON.parse(images)
      let _images = imageArray.map((image) => {
        const filename = `image_${Date.now()}.png`; // Đặt tên cho tệp
        const filePath = join('public', filename); // Đường dẫn đến thư mục public
        // Ghi tệp vào đĩa
        createWriteStream(filePath, { encoding: 'base64' })
          .write(image, 'base64');
        return 'static/' + filename

      })
      condition = {
        listImage: _images
      }
    }
    const product = await this.repository.save({ ...createProduct, listImage: [], ...condition, status: 1 });
    return product;
  }

  async updateProduct(dto: CreateProductInput, id: number) {
    const { images } = dto;
    delete(dto.images)
    let condition = {}

    if (images) {
      let imageArray = JSON.parse(images)
      let _images = imageArray.map((image) => {
      
        const filename = `image_${Date.now()}.png`; // Đặt tên cho tệp
        const filePath = join('public', filename); // Đường dẫn đến thư mục public
        // Ghi tệp vào đĩa
        createWriteStream(filePath, { encoding: 'base64' })
          .write(image, 'base64');
        return 'static/' + filename

      })
      condition = {
        listImage: _images
      }
    }
    await Product.update(
      {
        id,
      },
      {
        ...dto,
        ...condition
      },
    );

    return JSON.stringify('success')
  }

  async deleteProduct(id: number) {
    await Product.delete(id);
    return JSON.stringify('success')
  }

  async getProductDetail(id: number) {
    const product = await Product.findOne({
      where: {
        id
      }
    })
    if (!product) {
      throw new NotFoundException('product_not_found')
    }
    return product
  }
}
