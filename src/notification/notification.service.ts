import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto, sellerId: number) {
    return this.prisma.notification.create({
      data: {
        ...createNotificationDto,
        sellerId,
        isSended: true
      },
    });
  }

  async findAll(sellerId: number) {
    return this.prisma.notification.findMany({
      where: { sellerId },
    });
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async remove(id: number) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }
}
