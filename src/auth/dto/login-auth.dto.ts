import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto{
    @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchining email manzili' })
    email: string;

    @ApiProperty({ example: 'StrongPassword123', description: 'Foydalanuvchining paroli' })
    password: string;
}