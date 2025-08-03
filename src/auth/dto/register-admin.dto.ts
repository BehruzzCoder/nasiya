import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminAuthRegister {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Adminning email manzili',
  })
  @IsEmail({}, { message: 'Email notogri kiritilgan' })
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'Admin paroli (kamida 6 ta belgidan iborat bolishi kerak)',
  })
  @IsNotEmpty({ message: 'Parol bosh bolmasligi kerak' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bolishi kerak' })
  password: string;

  @ApiProperty({
    example: 'Behruz Mirbosidov',
    description: 'Adminning toliq ismi',
  })
  @IsNotEmpty({ message: 'Ism bosh bolmasligi kerak' })
  name: string;
}
