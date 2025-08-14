import { BadRequestException, Injectable, ForbiddenException } from '@nestjs/common';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDebterDto: CreateDebterDto, sellerId: number) {
    const { phoneNumber, ...debterData } = createDebterDto;

    const seller = await this.prisma.seller.findUnique({ where: { id: sellerId } });
    if (!seller) {
      throw new BadRequestException('Seller not found');
    }

    const newUser = await this.prisma.debter.create({
      data: { ...debterData, sellerId },
    });

    if (phoneNumber && phoneNumber.length > 0) {
      await this.prisma.phoneOfDebter.createMany({
        data: phoneNumber.map((number) => ({
          number,
          debterId: newUser.id,
        })),
      });
    }

    return newUser;
  }

  async findAll(sellerId: number) {
    return await this.prisma.debter.findMany({
      where: { sellerId },
      include: { Debt: true, PhoneOfDebter: true, Notification: true },
    });
  }

  async findOne(id: number, sellerId: number) {
    const debter = await this.prisma.debter.findUnique({
      where: { id },
      include: { Debt: true, PhoneOfDebter: true, Notification: true },
    });

    if (!debter || debter.sellerId !== sellerId) {
      throw new ForbiddenException('You do not have access to this debter');
    }

    return debter;
  }

  async update(id: number, updateDebterDto: UpdateDebterDto, sellerId: number) {
    const debter = await this.prisma.debter.findUnique({ where: { id } });

    if (!debter || debter.sellerId !== sellerId) {
      throw new ForbiddenException('You do not have access to update this debter');
    }

    return await this.prisma.debter.update({
      where: { id },
      data: updateDebterDto,
    });
  }

  async remove(id: number, sellerId: number) {
    const debter = await this.prisma.debter.findUnique({ where: { id } });

    if (!debter || debter.sellerId !== sellerId) {
      throw new ForbiddenException('You do not have access to delete this debter');
    }

    return await this.prisma.debter.delete({ where: { id } });
  }
}
