import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Emailga yuborilgan OTP kod',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 10) 
  otp: string;

  @ApiProperty({
    example: 'MyNewSecurePassword123!',
    description: 'Yangi parol (kamida 6 ta belgidan iborat bolishi kerak)',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 64)
  newPassword: string;
}
