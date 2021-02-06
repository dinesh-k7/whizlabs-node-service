import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { Department } from './department.entity';
import { Division } from './division.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
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
   * @param departmentId : number
   */

  async deleteDepartment(departmentId: number): Promise<void> {
    await this.departmentRepository.delete(departmentId);
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

  /**
   * Function to create Division
   * @param division : Division
   */
  async createDivision(division: Division): Promise<any> {
    return await this.divisionRepository.save(division);
  }

  /**
   * Function to delete Division
   * @param divisionId : number
   */
  async deleteDivision(divisionId: number): Promise<any> {
    return await this.divisionRepository.delete(divisionId);
  }

  /**
   * Function to update division
   * @param divisionId : number
   * @param division : Division
   */

  async updateDivision(
    divisionId: number,
    division: Division,
  ): Promise<Division> {
    const editedDivision = await this.divisionRepository.findOne(divisionId);
    if (!editedDivision) {
      throw new NotFoundException('Division is not found');
    }
    return await this.divisionRepository.save({
      ...division,
      id: Number(divisionId),
    });
  }

  /**
   * Function to get the list of all division
   * @param departmentId: number
   *
   */

  async getDivisionList(departmentId: number): Promise<Division[]> {
    return await this.divisionRepository.find({
      where: [{ department_id: departmentId }],
    });
  }

  /**
   * Function to get division by id
   * @param _id : number
   */

  async getDivision(_id: number): Promise<Division[]> {
    return await this.divisionRepository.find({
      where: [{ id: _id }],
    });
  }

  /**
   * Function to get division and field data based on departmentId
   * @param departmentId: number
   */
  async getDetails(departmentId: number): Promise<any> {
    return await getConnection().query(
      `SELECT dfield.id as fieldId, dfield.isDisplay, dvs.department_id,dvs.name as division_name, dfield.division_id,  dfield.name, dfield.type FROM division_field as dfield left join division as dvs on dfield.department_id = dvs.department_id where dvs.department_id =${departmentId} AND dvs.id = dfield.division_id`,
    );
  }
}
