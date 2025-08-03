import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Qarzdorlik muddati tugadi!', description: 'Xabarnoma matni' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 1, description: 'Xabar qaysi sotuvchiga tegishli' })
  @IsNumber()
  sellerId: number;

  @ApiProperty({ example: 2, description: 'Qaysi qarzdorga tegishli' })
  @IsNumber()
  debterId: number;
}
