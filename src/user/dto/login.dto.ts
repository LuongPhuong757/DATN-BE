import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @ApiProperty({ default: 'phuong.luong@sotatek.com' })
  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsNotEmpty()
  @ApiProperty({ default: '123456' })
  @IsString()
  password: string;
}
