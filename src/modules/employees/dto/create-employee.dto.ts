import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { Designation } from "src/utils/designation.enum"

export class CreateEmployeeDto {


    @ApiProperty()
    @IsString()
    firstName: string


    @ApiProperty()
    @IsString()
    lastName: string



    @ApiProperty()
    @IsString()
    phone: string


    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    designation: Designation;

    @ApiProperty()
    @IsString()
    department: string;

    @ApiProperty()
    @IsString()
    date_of_joining: string;
}
