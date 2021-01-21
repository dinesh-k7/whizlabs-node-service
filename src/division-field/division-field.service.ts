import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { DivisionField } from './division-field.entity';
import { Division } from '../department/division.entity';

@Injectable()
export class DivisionFieldService {
  constructor(
    @InjectRepository(DivisionField)
    private divisionFieldRepository: Repository<DivisionField>,
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  /**
   * Function to create Division field
   * @param divisionField : DivisionField
   */
  async createDepartment(divisionField: DivisionField): Promise<any> {
    return await this.divisionFieldRepository.save(divisionField);
  }

  /**
   * Function to get the list of all division field by division id
   * @param departmentId: number
   */
  // SELECT u.name as uname, d.name as dname, dv.name as divsionname, df.id, df.name, df.type FROM `user` as u JOIN department as d on d.id = u.`department_id` JOIN division as dv on dv.department_id = u.`department_id` JOIN division_field as df on df.department_id = u.`department_id` where u.`department_id` = 12
  async getAll(departmentId: number): Promise<DivisionField[]> {
    return await getConnection().query(
      `SELECT dfield.id, dvs.department_id,dvs.name as division_name, dfield.division_id,  dfield.name, dfield.type FROM division_field as dfield left join division as dvs on dfield.department_id = dvs.department_id where dvs.department_id =${departmentId} AND dvs.id = dfield.division_id`,
    );
  }

  /**
   * Function to get division field by id
   * @param _id : number
   */

  async getDivisionField(_id: number): Promise<DivisionField[]> {
    return await this.divisionFieldRepository.find({
      where: [{ id: _id }],
    });
  }

  /**
   * Function to update division field
   * @param divisionFieldId : number
   * @param divisionField : DivisionField
   */

  async updateDivisionField(
    divisionFieldId: number,
    divisionField: DivisionField,
  ): Promise<DivisionField> {
    const edited = await this.divisionFieldRepository.findOne(divisionFieldId);
    if (!edited) {
      throw new NotFoundException('Division field is not found');
    }
    return await this.divisionFieldRepository.save({
      ...divisionField,
      id: Number(divisionFieldId),
    });
  }

  /**
   * Function to delete division field
   * @param divisionFieldId : number
   */

  async deleteDivisionField(divisionFieldId: number): Promise<void> {
    await this.divisionFieldRepository.delete(divisionFieldId);
  }
}
