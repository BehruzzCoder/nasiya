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
  @IsNotEmpty({ message: 'Mahsulot nomi bosh bolishi kerak' })
  productName: string;

  @ApiProperty({ example: '2025-08-01', description: 'Qarzni bergan sana (YYYY-MM-DD formatda)' })
  @IsDateString({}, { message: 'Tori sana formatini kiriting (YYYY-MM-DD)' })
  date: string;


  @ApiProperty({ example: 'Telefon xaridi uchun qarz', description: 'Izoh' })
  @IsString()
  @IsNotEmpty({ message: 'Izoh bosh bolishi kerak' })
  description: string;

  @ApiProperty({ example: 1, description: 'Qarzdorning ID raqami' })
  @IsNumber()
  @IsNotEmpty({ message: 'Qarzdor IDsi bosh bolishi kerak' })
  debterId: number;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'Qarzni tasvirlovchi rasmlar (URL korinishida)',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true, message: 'Har bir rasm URL bosh bolmasligi kerak' })
  imgOfDebt: string[];
  @IsNumber()
  @ApiProperty()
  amount: number
  @IsNumber()
  @ApiProperty()
  duration:number
}
