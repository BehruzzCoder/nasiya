import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) { }
  async register(createAuthDto: CreateAuthDto) {
    const { password, PinCode, DeferredPayments } = createAuthDto;
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.seller.create({
      data: {
        ...createAuthDto,
        password: hash,
        PinCode: PinCode,
        DeferredPayments: DeferredPayments,
      },
    });
    return user;
  }
  async findAll() {
    return this.prisma.seller.findMany();
  }
  async findOne(id: number) {
    return this.prisma.seller.findUnique({ where: { id } });
  }
  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.prisma.seller.update({
      where: { id },
      data: updateAuthDto,
    });
  }
  async remove(id: number) {
    return this.prisma.seller.delete({ where: { id } });
  }
  async login(LoginAuthDto: LoginAuthDto) {
    const { email, password } = LoginAuthDto;
    const user = await this.prisma.seller.findFirst({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    let payload = { id: user.id, role: user.role, };
    return {
      token: this.jwt.sign(payload),
    };
  }
}
