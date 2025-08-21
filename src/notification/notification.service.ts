import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto, sellerId: number) {
    const { debterId, namunaId } = createNotificationDto;
    const debter = await this.prisma.debter.findFirst({
    where: {
    id: debterId,
    sellerId: sellerId,
  },
});
   const namuna = await this.prisma.namuna.findUnique({
      where: { id: namunaId },
    });


  if (!debter) {
    throw new NotFoundException('Debtor not found or does not belong to this seller');
  }
    if(!namuna){
      return this.prisma.notification.create({
        data: {
          ...createNotificationDto,
          sellerId,
          isSended: true
        },
      });
    }else{
      return this.prisma.notification.create({
        data: {
          debterId,
          sellerId,
          isSended: true,
          text: namuna.text,
        }
      })
    }
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
