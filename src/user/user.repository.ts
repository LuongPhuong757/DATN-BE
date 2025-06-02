import { NotFoundException } from '@nestjs/common';
import { User } from 'entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
