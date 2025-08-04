import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PayByAmountDto {
  @ApiProperty()
  @IsInt()
  debtId: number; 

  @ApiProperty()
  @IsInt()
  @Min(1)
  amount: number;
}
