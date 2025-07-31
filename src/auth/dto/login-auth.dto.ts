import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    @IsString()
    @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchining email manzili' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'StrongPassword123', description: 'Foydalanuvchining paroli' })
    password: string;
}