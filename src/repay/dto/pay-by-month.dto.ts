import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PayByMonthDto {
  @IsInt()
  @ApiProperty()
  @Min(1)
  months: number;
  @IsInt()
  @ApiProperty()
  debtId:number
}

