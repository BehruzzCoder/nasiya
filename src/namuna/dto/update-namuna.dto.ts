import { PartialType } from '@nestjs/swagger';
import { CreateNamunaDto } from './create-namuna.dto';

export class UpdateNamunaDto extends PartialType(CreateNamunaDto) {}
