import { Module } from '@nestjs/common';
import { DebterService } from './debtor.service';
import { DebterController } from './debtor.controller';

@Module({
  controllers: [DebterController],
  providers: [DebterService],
})
export class DebterModule {}
