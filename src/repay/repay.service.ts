import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PaymentSchedulesStatus } from '@prisma/client';
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
        debter: {
          sellerId: sellerId, // 👈 faqat o‘zining debteri bo‘lsa
        },
      },
    });

    if (!debt) throw new ForbiddenException('Bu qarz sizga tegishli emas');

    const schedules = await this.prisma.paymentSchedules.findMany({
      where: {
        debt_id: dto.debtId,
        status: PaymentSchedulesStatus.PENDING,
      },
      orderBy: {
        date: 'asc',
      },
      take: dto.months,
    });

    const scheduleIds = schedules.map((s) => s.id);

    await this.prisma.$transaction([
      this.prisma.debt.update({
        where: { id: dto.debtId },
        data: {
          duration: { decrement: dto.months },
        },
      }),
      this.prisma.paymentSchedules.updateMany({
        where: { id: { in: scheduleIds } },
        data: { status: PaymentSchedulesStatus.PAID },
      }),
    ]);

    return { message: `${dto.months} oylik qarz to'landi` };
  }

  // ✅ Pul miqdori bo‘yicha to‘lov
  async payByAmount(dto: PayByAmountDto, sellerId: number) {
    const debt = await this.prisma.debt.findFirst({
      where: {
        id: dto.debtId,
        debter: {
          sellerId: sellerId,
        },
      },
    });

    if (!debt) throw new ForbiddenException('Bu qarz sizga tegishli emas');

    const monthlyAmount = debt.monthly_amount;
    const fullMonths = Math.floor(dto.amount / monthlyAmount);
    const totalPay = fullMonths * monthlyAmount;

    const schedules = await this.prisma.paymentSchedules.findMany({
      where: {
        debt_id: dto.debtId,
        status: PaymentSchedulesStatus.PENDING,
      },
      orderBy: {
        date: 'asc',
      },
      take: fullMonths,
    });

    const scheduleIds = schedules.map((s) => s.id);

    await this.prisma.$transaction([
      this.prisma.debt.update({
        where: { id: dto.debtId },
        data: {
          duration: { decrement: fullMonths },
        },
      }),
      this.prisma.paymentSchedules.updateMany({
        where: { id: { in: scheduleIds } },
        data: { status: PaymentSchedulesStatus.PAID },
      }),
    ]);

    return {
      message: `Qarz ${fullMonths} oyga to'landi`,
      paidAmount: totalPay,
      monthsPaid: fullMonths,
      remainder: dto.amount - totalPay,
    };
  }

  // ❗Agar kerak bo‘lsa, bu joylarni ham xuddi shunday himoyalash mumkin:
  create(dto: CreateRepayDto) {
    return { message: 'Mock: repay created', data: dto };
  }

  update(dto: UpdateRepayDto) {
    return { message: 'Mock: repay updated', data: dto };
  }
}
