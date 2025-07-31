import { Injectable } from '@nestjs/common';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebterService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createDebterDto: CreateDebterDto) {
    const newUser = await this.prisma.debter.create({data: createDebterDto});
    return newUser;
  }

  async findAll() {
    return await this.prisma.debter.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.debter.findUnique({ where: { id } });
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
