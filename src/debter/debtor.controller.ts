import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { DebterService } from './debtor.service';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('debtor')
export class DebterController {
  constructor(private readonly debterService: DebterService) {}

  @Post()
  create(@Body() createDebterDto: CreateDebterDto, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.create(createDebterDto, sellerId);
  }

  @Get()
  findAll(@Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.findAll(sellerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.findOne(+id, sellerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebterDto: UpdateDebterDto, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.update(+id, updateDebterDto, sellerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.remove(+id, sellerId);
  }
}
