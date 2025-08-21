import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/jwt/roles.guard';

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}
  @Roles('SELLER')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Req() req, @Body() createDebtDto: CreateDebtDto) {
    const sellerId = (req as any).user.id;
    return this.debtService.create(sellerId, createDebtDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const sellerId = (req as any).user.id;
    return this.debtService.findAll(sellerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const sellerId = (req as any).user.id;
    return this.debtService.findOne(sellerId, +id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    const sellerId = (req as any).user.id;
    return this.debtService.update(sellerId, +id, updateDebtDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const sellerId = (req as any).user.id;
    return this.debtService.remove(sellerId, +id);
  }
}
