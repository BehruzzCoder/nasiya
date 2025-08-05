import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNamunaDto {
    @ApiProperty({
        example: true,
        description: 'Namunaning aktiv yoki aktiv emasligi',
    })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        example: 'Bu namuna matni',
        description: 'Namunaning matni',
    })
    @IsString()
    @IsNotEmpty()
    text: string;
}
