import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database-connection/database.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { DevicesModule } from './modules/devices/devices.module';

@Module({
  imports: [DatabaseModule,EmployeesModule,DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
