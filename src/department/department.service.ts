import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  /**
   * Function to create department
   * @param department : Department
   */
  async createDepartment(department: Department): Promise<any> {
    return await this.departmentRepository.save(department);
  }

  /**
   * Function to get the list of all departments
   *
   */

  async getDepartments(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  /**
   * Function to get department by id
   * @param _id : number
   */

  async getDepartment(_id: number): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: [{ id: _id }],
    });
  }

  /**
   * Function to update department
   * @param departmentId : number
   * @param department : Department
   */

  async updateDepartment(
    departmentId: number,
    department: Department,
  ): Promise<Department> {
    const editedDtp = await this.departmentRepository.findOne(departmentId);
    if (!editedDtp) {
      throw new NotFoundException('Department is not found');
    }
    return await this.departmentRepository.save({
      ...department,
      id: Number(departmentId),
    });
  }

  /**
   * Function to delete department
   * @param userId : number
   */

  async deleteDepartment(userId: number): Promise<void> {
    await this.departmentRepository.delete(userId);
  }

  /**
   * Function to get department by name
   * @param name : string
   */

  async getDepartmentByName(name: string): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: [{ name }],
    });
  }
}
