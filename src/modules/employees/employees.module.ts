import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Device } from '../devices/entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee,Device])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
