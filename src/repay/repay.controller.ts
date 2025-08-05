import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RepayService } from './repay.service';
import { PayByMonthDto } from './dto/pay-by-month.dto';
import { PayByAmountDto } from './dto/pay-by-amount.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('repay')
export class RepayController {
  constructor(private readonly repayService: RepayService) { }

  @Post('by-month')
  payByMonth(@Body() dto: PayByMonthDto, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.repayService.payByMonth(dto, sellerId);
  }

  @Post('by-amount')
  payByAmount(@Body() dto: PayByAmountDto, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.repayService.payByAmount(dto, sellerId);
  }
}
