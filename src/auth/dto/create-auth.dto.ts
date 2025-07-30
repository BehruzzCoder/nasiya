import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchining email manzili' })
    email: string;

    @ApiProperty({ example: 'StrongPassword123', description: 'Foydalanuvchining paroli' })
    password: string;

    @ApiProperty({ example: 'Behruz Mirbosidov', description: 'Toliq ism' })
    fullName: string;

    @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
    phoneNumber: string;

    @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'Profil rasmi URL manzili' })
    img: string;

    @ApiProperty({ example: 500000, description: 'Umumiy qarzdorlik summasi' })
    debtSum: number;

    @ApiProperty({ example: 1234, description: '4 xonali PIN kod' })
    PinCode: number;

    @ApiProperty({ example: '3 oy', description: 'Kechiktirilgan tolov muddati (masalan: 3 oy)' })
    DeferredPayments: string;

    @ApiProperty({ example: 5, description: 'Debtorlar soni' })
    debterCount: number;

    @ApiProperty({ example: 150000, description: 'Foydalanuvchining hamyoni (wallet) balansi' })
    wallet: number;
}
