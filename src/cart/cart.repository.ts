import { NotFoundException } from '@nestjs/common';
import { Product } from 'entities/product.entity';
import { User } from 'entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
