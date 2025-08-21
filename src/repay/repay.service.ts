import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PaymentSchedulesStatus, Prisma } from '@prisma/client';
import { PayByAmountDto } from './dto/pay-by-amount.dto';
import { PayByMonthDto } from './dto/pay-by-month.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRepayDto } from './dto/create-repay.dto';
import { UpdateRepayDto } from './dto/update-repay.dto';

@Injectable()
export class RepayService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ Oy bo‘yicha to‘lov
  async payByMonth(dto: PayByMonthDto, sellerId: number) {
    const debt = await this.prisma.debt.findFirst({
      where: {
        id: dto.debtId,
        debter: { sellerId },
      },
      include: { debter: true },
    });

    if (!debt) throw new ForbiddenException('Bu qarz sizga tegishli emas');

    const schedules = await this.prisma.paymentSchedules.findMany({
      where: {
        debt_id: dto.debtId,
        status: PaymentSchedulesStatus.PENDING,
      },
      orderBy: { date: 'asc' },
      take: dto.months,
    });

    if (!schedules.length) {
      return { message: 'Barcha qarzlar allaqachon yopilgan' };
    }

    const scheduleIds = schedules.map((s) => s.id);
    const totalPaid = schedules.reduce((sum, s) => sum + s.expected_amount, 0);

    await this.prisma.$transaction([
      this.prisma.debt.update({
        where: { id: dto.debtId },
        data: { duration: { decrement: dto.months } },
      }),
      this.prisma.paymentSchedules.updateMany({
        where: { id: { in: scheduleIds } },
        data: { status: PaymentSchedulesStatus.PAID },
      }),
      this.prisma.paymentHistory.create({
        data: {
          amount: totalPaid,
          method: 'CASH',
          sellerId,
          debterId: debt.debterId,
          debtId: debt.id,
        },
      }),
    ]);

    return { message: `${dto.months} oylik qarz to'landi` };
  }

  async payByAmount(dto: PayByAmountDto, sellerId: number) {
    const debt = await this.prisma.debt.findFirst({
      where: {
        id: dto.debtId,
        debter: { sellerId },
      },
      include: { debter: true },
    });

    if (!debt) throw new ForbiddenException('Bu qarz sizga tegishli emas');

    const monthlyAmount = debt.monthly_amount;
    let remainingAmount = dto.amount;

    const schedules = await this.prisma.paymentSchedules.findMany({
      where: { debt_id: dto.debtId, status: PaymentSchedulesStatus.PENDING },
      orderBy: { date: 'asc' },
    });

    if (!schedules.length) {
      return { message: 'Barcha qarzlar yopilgan' };
    }

    const updates: Prisma.PrismaPromise<any>[] = [];
    const paidSchedules: number[] = [];
    let message = '';
    let monthsPaid = 0;
    let totalPaid = 0;

    for (const schedule of schedules) {
      if (remainingAmount >= schedule.expected_amount) {
        // to‘liq yopiladi
        remainingAmount -= schedule.expected_amount;
        totalPaid += schedule.expected_amount;
        paidSchedules.push(schedule.id);
        monthsPaid++;
        updates.push(
          this.prisma.paymentSchedules.update({
            where: { id: schedule.id },
            data: { status: PaymentSchedulesStatus.PAID },
          }),
        );
      } else if (remainingAmount > 0) {
        totalPaid += remainingAmount;
        message = `So‘nggi schedule qisman to‘landi, qolgan ${schedule.expected_amount - remainingAmount} so‘m keyinroq to‘lanadi`;
        updates.push(
          this.prisma.paymentSchedules.update({
            where: { id: schedule.id },
            data: { expected_amount: schedule.expected_amount - remainingAmount },
          }),
        );
        remainingAmount = 0;
        break;
      }
    }

    await this.prisma.$transaction([
      // qarzni kamaytirish
      this.prisma.debt.update({
        where: { id: dto.debtId },
        data: { duration: { decrement: monthsPaid } },
      }),
      // payment update'lar
      ...updates,
      // history yozish
      this.prisma.paymentHistory.create({
        data: {
          amount: totalPaid,
          method: 'CASH',
          sellerId,
          debterId: debt.debterId,
          debtId: debt.id,
          note: message || null,
        },
      }),
    ]);

    return {
      message:
        message ||
        `Qarz ${monthsPaid} oy uchun yopildi. To‘langan summa: ${totalPaid}`,
      paidAmount: totalPaid,
      monthsPaid,
      remainder: remainingAmount,
    };
  }

  create(dto: CreateRepayDto) {
    return { message: 'Mock: repay created', data: dto };
  }

  update(dto: UpdateRepayDto) {
    return { message: 'Mock: repay updated', data: dto };
  }

  async getHistory(sellerId: number, debtId?: number) {
  return this.prisma.paymentHistory.findMany({
    where: {
      sellerId, 
      ...(debtId ? { debtId } : {}), 
    },
    include: {
      debt: {
        select: {
          productName: true,
          amount: true,
        },
      },
      debter: {
        select: {
          name: true,
          address: true,
        },
      },
      schedule: {
        select: {
          date: true,
          expected_amount: true,
        },
      },
    },
  });
}

}
