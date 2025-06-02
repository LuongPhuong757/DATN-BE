import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  statusCode: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
