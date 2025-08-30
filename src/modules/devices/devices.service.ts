import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Device } from './entities/device.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DevicesService {

  constructor(
    @InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
  ){}
async  create(createDeviceDto: CreateDeviceDto) {
    try{
      const employeeId= createDeviceDto.employeeId;
      if(!employeeId){
        throw new Error('Employee ID is required to assign device');
      } 
      const employee= await this.employeeRepository.findOne({where:{id:employeeId}});

      if(!employee){
        throw new Error('Employee not found with ID: '+employeeId);
      }
      
      
      const device= await this.deviceRepository.create({...createDeviceDto, employee});
     const savedDevice= await this.deviceRepository.save(device);
      return savedDevice;
    } catch(error){
      throw new Error('Device creation error: '+error.message);
    }
  }



async findAll() {
  try {
 

    const employees= await this.deviceRepository.find({relations:['employee']});

    return {
      message: 'Devices fetched successfully',
      data: employees,
   
    };
  } catch (error) {
    throw new Error('Error fetching devices: ' + error.message);
  }
}


async  findOne(id: number) {
    try{
     const device= await this.deviceRepository.findOne({where:{id}, relations:['employee']});
      if(!id){
        throw new Error('Device not found');
      } 

      return {
        "message": "Device fetched successfully",
        "data": device
      };

    }catch(error){ 
      throw new Error('Error fetching device: '+error.message);
    }
     

  }

async  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    try{
      const device= await this.deviceRepository.findOne({where:{id}});  
      if(!device){
        throw new Error('Device not found');
      }
      if(updateDeviceDto.employeeId){
        const employee= await this.employeeRepository.findOne({where:{id:updateDeviceDto.employeeId}});
        if(!employee){
          throw new Error('Employee not found with ID: '+updateDeviceDto.employeeId);
        } 

      }
      const updatedDevice= Object.assign(device, updateDeviceDto);
      const savedDevice= await this.deviceRepository.save(updatedDevice);
      return {
        message: 'Device updated successfully',
        data: savedDevice
      };
  }catch(error){
      throw new Error('Error updating device: '+error.message);
    }
  }

async  remove(id: number) {
    try{
       const device= await this.deviceRepository.findOne({where:{id}});
      if(!device){
        throw new Error('Device not found');
      }   

      await this.deviceRepository.remove(device);
      return {
        message: 'Device deleted successfully'
      };
  }catch(error){
      throw new Error('Error deleting device: '+error.message); 
  }
}
}
