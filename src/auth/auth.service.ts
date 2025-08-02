import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AdminAuthRegister } from './dto/register-admin.dto';

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
  async AdminRegister(data:AdminAuthRegister){
    const {password} = data
    let hash = bcrypt.hashSync(password, 10)
    const newAdmin = await this.prisma.admin.create({
      data: {
        ...data,
        password: hash
      }
    })
    return newAdmin
  }
  async AdminLogin(data:any){
    
  }
  async findAll() {
    return this.prisma.seller.findMany({ include: { Debter: true } });
  }
  async findOne(id: number) {
    return this.prisma.seller.findUnique({ where: { id }, include: { Debter: true } });
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
    let payload = { id: user.id, role: "seller" };
    return {
      token: this.jwt.sign(payload),
    };
  }
}
