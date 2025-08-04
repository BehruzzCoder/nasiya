import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RepayService } from './repay.service';
import { PayByAmountDto } from './dto/pay-by-amount.dto';
import { PayByMonthDto } from './dto/pay-by-month.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/decorator/roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles("SELLER", "ADMIN")
@Controller('repay')
export class RepayController {
  constructor(private readonly repayService: RepayService) { }

  @Post('by-month')
  payByMonth(@Body() dto: PayByMonthDto) {
    return this.repayService.payByMonth(dto);
  }

  @Post('by-amount')
  payByAmount(@Body() dto: PayByAmountDto) {
    return this.repayService.payByAmount(dto);
  }
}
