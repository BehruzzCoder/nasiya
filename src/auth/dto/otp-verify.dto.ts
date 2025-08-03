import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpVerify {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Foydalanuvchining royxatdan otgan email manzili',
  })
  @IsEmail({}, { message: 'Email notogri formatda' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Email orqali yuborilgan 6 xonali OTP kod',
  })
  @IsString({ message: 'OTP matn korinishida bolishi kerak' })
  @Length(6, 6, { message: 'OTP aynan 6 ta belgidan iborat bolishi kerak' })
  otp: string;
}
