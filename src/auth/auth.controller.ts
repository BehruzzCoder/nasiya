import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AdminAuthRegister } from './dto/register-admin.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { OtpVerify } from './dto/otp-verify.dto';
import { ResendOtp } from './dto/resend-top.dto';
import { UpdateAdminDto } from './dto/admin-update.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RolesGuard } from './jwt/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Post('admin/register')
  registerAdmin(@Body() adminRegisterDto: AdminAuthRegister) {
    return this.authService.AdminRegister(adminRegisterDto);
  }

  @Post('admin/login')
  loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.AdminLogin(adminLoginDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch('admin/update')
  updateAdmin(@Req() req: Request, @Body() updateAdminDto: UpdateAdminDto) {
    const userId = (req as any).user?.id;
    return this.authService.updateAdmin(userId, updateAdminDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('ADMIN')
  @Post('seller/register')
  registerSeller(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('seller/login')
  loginSeller(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('seller')
  findAllSellers(@Req() req: Request) {
    return this.authService.findAll();
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('seller/:id')
  findOneSeller(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch('seller/:id')
  updateSeller(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete('seller/:id')
  removeSeller(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('verify-otp')
  verifyOtp(@Body() OtpVerify: OtpVerify) {
    return this.authService.verifyOtp(OtpVerify.email, OtpVerify.otp);
  }

  @Post('resend-otp')
  resendOtp(@Body() ResendOtp: ResendOtp) {
    return this.authService.sendOtp(ResendOtp.email);
  }

  @Post('forgot-password')
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email);
  }

  @Post('reset-password')
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(
      data.email,
      data.otp,
      data.newPassword,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const { id, role } = req.user;
    return this.authService.me(id, role);
  }
}
