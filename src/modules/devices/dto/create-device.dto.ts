import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateDeviceDto {


     @ApiProperty()
    @IsNumber()
    employeeId: number;

    
     @ApiProperty()
    @IsString()
    deviceName: string;
    
     @ApiProperty()
    @IsString()
    os: string;
    
     @ApiProperty()
    @IsString()
    osVersion: string;
    
     @ApiProperty()
    @IsString()
    imeiNumber: string;
    
     @ApiProperty()
    @IsDate()
    registeredAt: Date;


}
