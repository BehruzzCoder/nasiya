import { Controller, Post, Body, Req, UseGuards, Get, Param, Query } from '@nestjs/common';
import { RepayService } from './repay.service';
import { PayByMonthDto } from './dto/pay-by-month.dto';
import { PayByAmountDto } from './dto/pay-by-amount.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/jwt/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('repay')
export class RepayController {
  constructor(private readonly repayService: RepayService) { }

  @ApiBearerAuth()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('SELLER')
  @Post('by-month')
  payByMonth(@Body() dto: PayByMonthDto, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.repayService.payByMonth(dto, sellerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('SELLER')
  @Post('by-amount')
  payByAmount(@Body() dto: PayByAmountDto, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.repayService.payByAmount(dto, sellerId);
  }
  @Get('PaymentHistory')
  @ApiQuery({ name: 'debtId', required: false, type: Number })
  async getHistory(
    @Req() req,
    @Query('debtId') debtId?: string,
  ) {
    const sellerId = req.user.id; 
    return this.repayService.getHistory(
      sellerId,
      debtId ? Number(debtId) : undefined,
    );
  }
}

