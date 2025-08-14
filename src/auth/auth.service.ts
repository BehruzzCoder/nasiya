import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AdminAuthRegister } from './dto/register-admin.dto';
import { OtpService } from 'src/utils/otp.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UpdateAdminDto } from './dto/admin-update.dto';

@Injectable()
export class AuthService {
  constructor(private readonly otp: OtpService, private readonly prisma: PrismaService, private readonly jwt: JwtService) { }
  async register(createAuthDto: CreateAuthDto) {
    const admin = await this.prisma.admin.findFirst({ where: { email: createAuthDto.email } })
    if (admin) {
      throw new BadRequestException("email already exits")
    }
    const { password } = createAuthDto;
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.seller.create({
      data: {
        ...createAuthDto,
        password: hash,
      },
    });
    this.otp.sendOtp(createAuthDto.email)
    return user;
  }
  async AdminRegister(data: AdminAuthRegister) {
    const { password } = data
    let seller = await this.prisma.seller.findFirst({ where: { email: data.email } })
    if (seller) {
      throw new BadRequestException("email already exits")
    }
    let hash = bcrypt.hashSync(password, 10)
    const newAdmin = await this.prisma.admin.create({
      data: {
        ...data,
        password: hash
      }
    })
    this.otp.sendOtp(data.email)
    return newAdmin
  }
  async AdminLogin(data: AdminLoginDto) {
    let admin = await this.prisma.admin.findFirst({ where: { email: data.email } })
    if (!admin) {
      throw new BadRequestException("email is invalid")
    }
    let isMatch = bcrypt.compareSync(data.password, admin.password)
    if (!isMatch) {
      throw new BadRequestException('Login yoki parol notogri')
    }
    let token = this.jwt.sign({ id: admin.id, role: "ADMIN" })
    return { token }
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
    let payload = { id: user.id, role: "SELLER" };
    return {
      token: this.jwt.sign(payload),
    };

  }
  async verifyOtp(email: string, otp: string) {
    const isValid = this.otp.verifyOtp(email, otp);
    if (!isValid) {
      throw new BadRequestException('OTP notogri');
    }
    const seller = await this.prisma.seller.findFirst({ where: { email } });
    const admin = await this.prisma.admin.findFirst({ where: { email } });

    if (!seller && !admin) {
      throw new BadRequestException('Email topilmadi');
    }
    if (seller) {
      await this.prisma.seller.update({
        where: { id: seller.id },
        data: { isActive: true },
      });
      return { message: 'Seller muvaffaqiyatli aktivlashtirildi' };
    } else if (admin) {
      await this.prisma.admin.update({
        where: { id: admin.id },
        data: { IsActive: true },
      });
      return { message: 'Admin muvaffaqiyatli aktivlashtirildi' };
    }
  }
  async sendOtp(email: string) {
    let admin = await this.prisma.admin.findFirst({ where: { email } })
    let seller = await this.prisma.seller.findFirst({ where: { email } })
    if (!admin && !seller) {
      throw new BadRequestException("email is invalid")
    }
    this.otp.sendOtp(email)
    return { message: "otp muvaffaqiyatli jonatildi" }
  }
  async removeAdmin(id: number) {
    let admin = await this.prisma.admin.findFirst({ where: { id } })
    if (!admin) {
      throw new NotFoundException("admin not found")
    }
    let deleted = await this.prisma.admin.delete({ where: { id } })
    return admin
  }
  async allAdmin() {
    let all = await this.prisma.admin.findMany()
    return all
  }
  async updateAdmin(id: number, updateData: UpdateAdminDto) {
    return this.prisma.admin.update({
      where: { id },
      data: updateData,
    });
  }
  async forgotPassword(email: string) {
    const user = await this.prisma.seller.findFirst({ where: { email } });
    const admin = await this.prisma.admin.findFirst({ where: { email } });

    if (!user && !admin) {
      throw new BadRequestException("Email not found");
    }

    await this.otp.sendOtp(email);
    return { message: "OTP emailga yuborildi" };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const isValid = this.otp.verifyOtp(email, otp);
    if (!isValid) {
      throw new BadRequestException("OTP noto'g'ri yoki eskirgan");
    }

    const user = await this.prisma.seller.findFirst({ where: { email } });
    const admin = await this.prisma.admin.findFirst({ where: { email } });

    if (!user && !admin) {
      throw new BadRequestException("Email topilmadi");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (user) {
      await this.prisma.seller.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      return { message: "Seller paroli yangilandi" };
    }

    if (admin) {
      await this.prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword },
      });
      return { message: "Admin paroli yangilandi" };
    }
  }
  async me(id){       
  let admin = await this.prisma.admin.findUnique({where:{id}}) 
  let seller=  await  this.prisma.seller.findUnique({where:{id}})  
  if(!seller){
    return admin
  }   
  if(!admin){
    return seller
  } 
  return ""
  }

}
