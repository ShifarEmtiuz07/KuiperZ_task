import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Device])],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule { }
