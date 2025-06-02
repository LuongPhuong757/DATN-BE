import { ApiProperty } from '@nestjs/swagger';
import { User } from 'entities/user.entity';

export class LoginResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;
}
