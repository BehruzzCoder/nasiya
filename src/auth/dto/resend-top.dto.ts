import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendOtp {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail({}, { message: 'Email' })
  email: string;
}
