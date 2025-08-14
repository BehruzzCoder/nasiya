import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebterService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createDebterDto: CreateDebterDto) {
    const { phoneNumber, sellerId, ...debterData } = createDebterDto;
    let seller = await this.prisma.seller.findFirst({ where: { id: sellerId } })
    if (!seller) {
      throw new BadRequestException("seller not found")
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


  async findAll() {
    return await this.prisma.debter.findMany({ include: { Debt: true, PhoneOfDebter: true, Notification: true } });
  }

  async findOne(id: number) {
    return await this.prisma.debter.findUnique({ where: { id }, include: { Debt: true, PhoneOfDebter: true, Notification: true } });
  }

  async update(id: number, updateDebterDto: UpdateDebterDto) {
    return await this.prisma.debter.update({
      where: { id },
      data: updateDebterDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.debter.delete({ where: { id } });
  }
}
