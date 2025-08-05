import { Module } from '@nestjs/common';
import { NamunaService } from './namuna.service';
import { NamunaController } from './namuna.controller';

@Module({
  controllers: [NamunaController],
  providers: [NamunaService],
})
export class NamunaModule {}
