import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

  async create(createNotificationDto: CreateNotificationDto) {
    return await this.prisma.notification.create({
       data:{...createNotificationDto , isSended:true}

    });
  }

  async findAll() {
    return await this.prisma.notification.findMany();
  }

  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const existing = await this.prisma.notification.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Notification not found');
    }

    return await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.notification.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Notification not found');
    }

    return await this.prisma.notification.delete({
      where: { id },
    });
  }
}
