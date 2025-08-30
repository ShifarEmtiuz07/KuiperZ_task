import { Device } from "src/modules/devices/entities/device.entity";
import { Designation } from "src/utils/designation.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('employees')
export class Employee {


    @PrimaryGeneratedColumn()
    id:number
    @Column()
    firstName:string
    @Column()
    lastName:string
    @Column({unique:true})
    employeeNumber:string
    @Column({unique:true})
    phone:string
    @Column({unique:true})
    email:string    
    @Column({type:'enum', enum: Designation})
    designation:Designation;
    @Column()
    department:string;
    @Column()
    date_of_joining:Date;
    @CreateDateColumn()
    createdAt:Date;

    @OneToMany(() => Device, device => device.employee)
    devices: Device[];

}
