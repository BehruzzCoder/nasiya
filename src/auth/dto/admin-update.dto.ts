import { PartialType } from '@nestjs/mapped-types';
import { AdminAuthRegister } from './register-admin.dto';

export class UpdateAdminDto extends PartialType(AdminAuthRegister) {}
