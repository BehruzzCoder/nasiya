import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
     

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("seller/register")
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post("seller/login")
  login(@Body() LoginAuthDto: LoginAuthDto) {
    return this.authService.login(LoginAuthDto);
  }
  @Get("seller")
  findAll() {
    return this.authService.findAll();
  }

  @Get('seller/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch('seller/:id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('seller/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
