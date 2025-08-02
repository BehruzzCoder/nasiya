import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateDebtDto {
  @ApiProperty({ example: 'iPhone 14', description: 'Mahsulot nomi' })
  @IsString()
  @IsNotEmpty({ message: 'Mahsulot nomi bosh bo‘lishi kerak' })
  productName: string;

  @ApiProperty({ example: '2025-08-01', description: 'Qarzni bergan sana (YYYY-MM-DD formatda)' })
  @IsDateString({}, { message: 'To‘g‘ri sana formatini kiriting (YYYY-MM-DD)' })
  date: string;

  @ApiProperty({ example: '3 oy', description: 'To‘lov muddati' })
  @IsString()
  @IsNotEmpty({ message: 'To‘lov muddati bosh bo‘lishi kerak' })
  term: string;

  @ApiProperty({ example: 'Telefon xaridi uchun qarz', description: 'Izoh' })
  @IsString()
  @IsNotEmpty({ message: 'Izoh bosh bo‘lishi kerak' })
  description: string;

  @ApiProperty({ example: 1, description: 'Qarzdorning ID raqami' })
  @IsNumber()
  @IsNotEmpty({ message: 'Qarzdor IDsi bosh bo‘lishi kerak' })
  debterId: number;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'Qarzni tasvirlovchi rasmlar (URL ko‘rinishida)',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true, message: 'Har bir rasm URL bo‘sh bo‘lmasligi kerak' })
  imgOfDebt: string[];
}
