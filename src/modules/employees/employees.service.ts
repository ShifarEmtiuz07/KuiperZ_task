import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeIdGenerate } from 'src/utils/employeeIdGenerator';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ){}

async  create(createEmployeeDto: CreateEmployeeDto) {
   try{

      const [previousEmployees, employeeCount] = await this.employeeRepository
  .createQueryBuilder('employee')
  .select(['employee.id', 'employee.employeeNumber']) 
  .getManyAndCount();

      console.log('Previous Employees:', previousEmployees);
      console.log('Employee Count:', employeeCount);

    const countPart = (employeeCount + 1).toString().padStart(6, '0');
    const employeeNumber = EmployeeIdGenerate() + countPart;
    console.log(employeeNumber);
    const employee= await this.employeeRepository.create({...createEmployeeDto, employeeNumber});
    console.log(employee);
   const savedEmployee= await this.employeeRepository.save(employee);
   console.log(savedEmployee)
    return savedEmployee;

   }catch(error){
    throw new InternalServerErrorException('Employee creation error: '+error.message);
   }
  }

async  findAll(page,limit,searchTerm?: string) {

    const qb= this.employeeRepository.createQueryBuilder('employee')
                                     .select(['employee.id', 'employee.firstName', 'employee.lastName', 'employee.employeeNumber', 'employee.phone', 'employee.email', 'employee.designation', 'employee.department', 'employee.date_of_joining', 'employee.createdAt'])
                                     .orderBy('employee.createdAt', 'DESC')
                                     .leftJoinAndSelect('employee.devices', 'device')
                                     .addSelect(['device.id', 'device.deviceName', 'device.os', 'device.osVersion', 'device.imeiNumber', 'device.registeredAt']);

    if(searchTerm){
      page=1;
      qb.where('employee.firstName LIKE :searchTerm OR employee.lastName LIKE :searchTerm OR employee.employeeNumber LIKE :searchTerm OR employee.phone LIKE :searchTerm OR employee.email LIKE :searchTerm OR  employee.department LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
    }

    const [employees,totalEmployees]= await qb.skip((page-1)*limit).take(limit).getManyAndCount();

    return{
      message:'Employees fetched successfully',
      data:employees,
      totalEmployees:totalEmployees,
      totalPages: Math.ceil(totalEmployees/limit),
      currentPage: page
    }
    
  }

async  findOne(id: number) {
  try{

      const employee= await this.employeeRepository.findOne({where:{id}, relations:['devices']});
    if(!employee){
      throw new InternalServerErrorException('Employee not found');
    }

    return {
      "message": "Employee fetched successfully",
      "data": employee
    };

  }catch(error){
    throw new InternalServerErrorException('Error fetching employee: '+error.message);
  }
  
  }

async  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try{
      const employee= await this.employeeRepository.findOne({where:{id}});
      if(!employee){
        throw new InternalServerErrorException('Employee not found');
      } 

      const updatedEmployee= Object.assign(employee, updateEmployeeDto);
      const savedEmployee= await this.employeeRepository.save(updatedEmployee);
      return {
        message: 'Employee updated successfully',
        data: savedEmployee
      };

    }catch(error){
      throw new InternalServerErrorException('Error updating employee: '+error.message);
    }
  }

async  remove(id: number) {

  try{
     const employee= await this.employeeRepository.findOne({where:{id}});
    if(!employee){
      throw new InternalServerErrorException('Employee not found');
    }

    await this.employeeRepository.remove(employee);
    return {
      message: 'Employee deleted successfully'
    };

  }catch(error){
    throw new InternalServerErrorException('Error deleting employee: '+error.message);
   
  }
}
}
