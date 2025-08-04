import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createDebtDto: CreateDebtDto) {
    const { debterId, imgOfDebt, ...debtData } = createDebtDto;

    const debter = await this.prisma.debter.findUnique({
      where: { id: debterId },
    });

    if (!debter) {
      throw new BadRequestException('Debter not found');
    }
    let monthly_amount = createDebtDto.amount / createDebtDto.duration
    const newDebt = await this.prisma.debt.create({
      data: {
        ...debtData,
        debterId,
        monthly_amount
      },
    });

    if (imgOfDebt && imgOfDebt.length > 0) {
      await this.prisma.imgOfDebt.createMany({
        data: imgOfDebt.map((imgName) => ({
          name: imgName,
          debtId: newDebt.id,
        })),
      });

    }
    for(let i =0; i <= createDebtDto.duration;i++){
       const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i);

        await this.prisma.paymentSchedules.create({
          data: {
            debt_id:newDebt.id,
            expected_amount:newDebt.monthly_amount,
            date:dueDate

          },
        });
    }

    return newDebt;
  }


  findAll() {
    const debtALL = this.prisma.debt.findMany({
      include: { debter: true, ImgOfDebt: true,PaymentSchedules:true }
    });
    return debtALL;
  }

  findOne(id: number) {
    return this.prisma.debt.findUnique({
      where: { id },
      include: { debter: true }
    });
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return this.prisma.debt.update({
      where: { id },
      data: updateDebtDto,
      include: { debter: true }
    });
  }

  remove(id: number) {
    return this.prisma.debt.delete({
      where: { id }
    });
  }
}
