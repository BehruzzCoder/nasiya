import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NamunaService } from './namuna.service';
import { CreateNamunaDto } from './dto/create-namuna.dto';
import { UpdateNamunaDto } from './dto/update-namuna.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('namuna')
export class NamunaController {
  constructor(private readonly namunaService: NamunaService) { }

  @Post()
  create(@Req() req: Request, @Body() createDto: CreateNamunaDto) {
    const sellerId = (req as any).user.id;
    return this.namunaService.create(createDto, sellerId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.namunaService.findAll(sellerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.namunaService.findOne(+id, sellerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateNamunaDto, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.namunaService.update(+id, updateDto, sellerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.namunaService.remove(+id, sellerId);
  }
}
