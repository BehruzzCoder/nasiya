import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DebterModule } from './debter/debtor.module';
import { DebtModule } from './debt/debt.module';
import { NotificationModule } from './notification/notification.module';
import { RepayModule } from './repay/repay.module';
import { NamunaModule } from './namuna/namuna.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      global: true,
    }),
    UploadModule,
    DebterModule,
    DebtModule,
    NotificationModule,
    RepayModule,
    NamunaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
