import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAuthDto {
    @IsEmail()
    @IsString()
    @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchining email manzili' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'StrongPassword123', description: 'Foydalanuvchining paroli' })
    password: string;

    @IsString()
    @ApiProperty({ example: 'Behruz Mirbosidov', description: 'Toliq ism' })
    fullName: string;

    @IsString()
    @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
    phoneNumber: string;

    @IsString()
    @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'Profil rasmi URL manzili' })
    img: string;

    @IsNumber()
    @ApiProperty({ example: 5, description: 'Debtorlar soni' })
    debterCount: number;

    @IsNumber()
    @ApiProperty({ example: 150000, description: 'Foydalanuvchining hamyoni (wallet) balansi' })
    wallet: number;
}
