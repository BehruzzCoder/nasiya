import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNamunaDto } from './dto/create-namuna.dto';
import { UpdateNamunaDto } from './dto/update-namuna.dto';

@Injectable()
export class NamunaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNamunaDto: CreateNamunaDto, sellerId: number) {
    return this.prisma.namuna.create({
      data: {
        ...createNamunaDto,
        sellerId,
      },
    });
  }

  async findAll(sellerId: number) {
    return this.prisma.namuna.findMany({
      where: { sellerId },
    });
  }

  async findOne(id: number, sellerId: number) {
    const item = await this.prisma.namuna.findUnique({ where: { id } });
    if (!item || item.sellerId !== sellerId) {
      throw new ForbiddenException('Siz bu malumotga kira olmaysiz');
    }
    return item;
  }

  async update(id: number, updateDto: UpdateNamunaDto, sellerId: number) {
    const item = await this.prisma.namuna.findUnique({ where: { id } });
    if (!item || item.sellerId !== sellerId) {
      throw new ForbiddenException('Siz bu malumotni yangilay olmaysiz');
    }
    return this.prisma.namuna.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number, sellerId: number) {
    const item = await this.prisma.namuna.findUnique({ where: { id } });
    if (!item || item.sellerId !== sellerId) {
      throw new ForbiddenException('Siz bu malumotni ochira olmaysiz');
    }
    return this.prisma.namuna.delete({
      where: { id },
    });
  }
}
