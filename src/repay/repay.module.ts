import { Module } from '@nestjs/common';
import { RepayService } from './repay.service';
import { RepayController } from './repay.controller';

@Module({
  controllers: [RepayController],
  providers: [RepayService],
})
export class RepayModule {}
