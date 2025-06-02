import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class SignupDto {
  @IsEmail({})
  @IsNotEmpty()
  @ApiProperty({
    type: 'email',
    default: 'phuong.luong@sotatek.com',
  })
  email: string;

  @IsEmail({})
  @IsNotEmpty()
  @ApiProperty({
    type: 'email',
    default: 'phuong.luong@sotatek.com',
  })
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '123456',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '123456',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '123456',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '123456',
  })
  avatar: string;

  // @ApiProperty({ default: false })
  // @IsBoolean()
  // isNewLetter: boolean;
}
