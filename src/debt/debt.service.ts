import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtService {
  constructor(private readonly prisma: PrismaService) {}

  async create(sellerId: number, createDebtDto: CreateDebtDto) {
  const { debterId, productName, date, description, imgOfDebt, amount, duration } = createDebtDto;

  const debter = await this.prisma.debter.findFirst({
    where: { id: debterId, sellerId },
  });
  if (!debter) {
    throw new NotFoundException('Debtor not found');
  }

  const monthly_amount = Math.floor(amount / duration);

  const newDebt = await this.prisma.debt.create({
    data: {
      debter: { connect: { id: debterId } },
      productName,
      date,
      description,
      amount,
      duration,
      monthly_amount,
    },
  });

  if (imgOfDebt && imgOfDebt.length > 0) {
    await this.prisma.imgOfDebt.createMany({
      data: imgOfDebt.map((name) => ({
        name,
        debtId: newDebt.id,
      })),
    });
  }

  const schedulesData = Array.from({ length: duration }).map((_, i) => ({
    debt_id: newDebt.id,
    date: new Date(new Date(date).setMonth(new Date(date).getMonth() + i)), 
    expected_amount: monthly_amount,
  }));

  await this.prisma.paymentSchedules.createMany({
    data: schedulesData,
  });

  return newDebt;
}

  async findAll(sellerId: number) {
    return this.prisma.debt.findMany({
      where: {
        debter: { sellerId }
      },
      include: {
        debter: true,
        ImgOfDebt: true,
        PaymentSchedules: true
      }
    });
  }

  async findOne(sellerId: number, id: number) {
    const debt = await this.prisma.debt.findUnique({
      where: { id },
      include: {
        debter: true,
        ImgOfDebt: true,
        PaymentSchedules: true
      }
    });

    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    if (debt.debter.sellerId !== sellerId) {
      throw new ForbiddenException('Access denied');
    }

    return debt;
  }

  async update(sellerId: number, id: number, updateDebtDto: UpdateDebtDto) {
    const debt = await this.prisma.debt.findUnique({
      where: { id },
      include: { debter: true }
    });

    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    if (debt.debter.sellerId !== sellerId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.debt.update({
      where: { id },
      data: updateDebtDto
    });
  }

  async remove(sellerId: number, id: number) {
    const debt = await this.prisma.debt.findUnique({
      where: { id },
      include: { debter: true }
    });

    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    if (debt.debter.sellerId !== sellerId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.debt.delete({ where: { id } });
  }
}
