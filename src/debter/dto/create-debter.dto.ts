import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDebterDto {
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'Debtor\'s full name' })
    name: string;
    @IsString()
    @ApiProperty({ example: '123 Main St', description: 'Debtor\'s address' })
    address: string;
    @IsString()
    @ApiProperty({ example: 'Owes $1000', description: 'Additional notes about the debtor' })
    note: string;
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID of the seller associated with the debtor' })
    sellerId: number;
    @IsNumber()
    @ApiProperty({ example: 1000, description: 'Total debt amount' })
    debtSum: number;
    @IsString({ each: true })
    @IsNotEmpty({ each: true, message: 'Phone numbers cannot be empty' })
    @ApiProperty({ isArray: true, type: String, example: ['+998901234567', '+998901234568'], description: 'List of phone numbers associated with the debtor' })
    phoneNumber: string[];

}
