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
  ForbiddenException,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Req() req: Request, @Body() createNotificationDto: CreateNotificationDto) {
    const sellerId = (req as any).user.id;
    return this.notificationService.create(createNotificationDto, sellerId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const sellerId = (req as any).user.id;
    return this.notificationService.findAll(sellerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    const notification = await this.notificationService.findOne(+id);

    if (!notification || notification.sellerId !== sellerId) {
      throw new ForbiddenException('Siz bu bildirishnomani ko‘ra olmaysiz');
    }

    return notification;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Req() req: Request,
  ) {
    const sellerId = (req as any).user.id;
    const notification = await this.notificationService.findOne(+id);

    if (!notification || notification.sellerId !== sellerId) {
      throw new ForbiddenException('Siz bu bildirishnomani yangilay olmaysiz');
    }

    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const sellerId = (req as any).user.id;
    const notification = await this.notificationService.findOne(+id);

    if (!notification || notification.sellerId !== sellerId) {
      throw new ForbiddenException('Siz bu bildirishnomani o‘chira olmaysiz');
    }

    return this.notificationService.remove(+id);
  }
}
