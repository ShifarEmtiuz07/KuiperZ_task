import { Employee } from "src/modules/employees/entities/employee.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('devices')
export class Device {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    deviceName: string;
    @Column()
    os:string;
    @Column()
    osVersion:string;
    @Column({unique:true})
    imeiNumber:string;
    @Column()
    registeredAt:Date;

  @ManyToOne(() => Employee, employee => employee.devices, { onDelete: 'SET NULL' })
  employee: Employee;

}
