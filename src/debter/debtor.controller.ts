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
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/jwt/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('debtor')
export class DebterController {
  constructor(private readonly debterService: DebterService) {}

  @ApiBearerAuth()
  @Roles('SELLER')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  create(@Body() createDebterDto: CreateDebterDto, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.create(createDebterDto, sellerId);
  }

  @Roles('SELLER')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  findAll(@Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.findAll(sellerId);
  }

  @Roles('SELLER')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.findOne(+id, sellerId);
  }

  @Roles('SELLER')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebterDto: UpdateDebterDto, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.update(+id, updateDebterDto, sellerId);
  }

  @Roles('SELLER')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const sellerId = (req as any).user.id;
    return this.debterService.remove(+id, sellerId);
  }
}
