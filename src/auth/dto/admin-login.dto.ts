import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
    @ApiProperty({
        example: 'admin123@gmail',
        description: 'Admin email nomi',
    })
    @IsString({ message: 'email matn korinishida bolishi kerak' })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'adminpassword',
        description: 'Admin paroli',
    })
    @IsString({ message: 'Parol matn bolishi kerak' })
    @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bolishi kerak' })
    @MaxLength(64, { message: 'Parol 64 ta belgidan oshmasligi kerak' })
    password: string;
}
