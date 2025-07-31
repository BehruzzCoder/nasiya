import { PartialType } from '@nestjs/swagger';
import { CreateDebterDto } from './create-debter.dto';

export class UpdateDebterDto extends PartialType(CreateDebterDto) {}
