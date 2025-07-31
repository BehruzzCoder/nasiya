import { Module } from '@nestjs/common';
import { DebterService } from './debter.service';
import { DebterController } from './debter.controller';

@Module({
  controllers: [DebterController],
  providers: [DebterService],
})
export class DebterModule {}
