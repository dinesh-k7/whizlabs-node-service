import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

import { ProjectData } from './project-data.entity';

@Injectable()
export class ProjectDataService {
  constructor(
    @InjectRepository(ProjectData)
    private projectDataRepository: Repository<ProjectData>,
  ) {}

  /**
   * Function to create project data
   * @param projectData : ProjectData
   */
  async createProjectData(projectData: ProjectData): Promise<any> {
    return await this.projectDataRepository.save(projectData);
  }

  /**
   * Function to get the list of all project data
   *
   */
  // SELECT u.name as uname, d.name as dname, dv.name as divsionname, df.id, df.name, df.type FROM `user` as u JOIN department as d on d.id = u.`department_id` JOIN division as dv on dv.department_id = u.`department_id` JOIN division_field as df on df.department_id = u.`department_id` where u.`department_id` = 12
  async getAll(): Promise<ProjectData[]> {
    return await getConnection().query(
      `SELECT dfield.id, dvs.department_id,dvs.name as division_name, dfield.division_id,  dfield.name, dfield.type FROM division_field as dfield left join division as dvs on dfield.department_id = dvs.department_id where dvs.department_id = dfield.department_id AND dvs.id = dfield.division_id`,
    );
  }

  /**
   * Function to get project data by id
   * @param _id : number
   */

  async getProjectData(_id: number): Promise<ProjectData[]> {
    return await this.projectDataRepository.find({
      where: [{ id: _id }],
    });
  }

  /**
   * Function to get project data by user_id
   * @param user_id : number
   */

  async getProjectByUser(userId: number): Promise<ProjectData[]> {
    return await getConnection().query(
      `SELECT u.name as uname, d.name as department_name, dv.name as division_name, 
      dv.id as division_id FROM user as u JOIN department as d on d.id = u.department_id 
      JOIN division as dv on dv.department_id = u.department_id where u.id = ${userId}`,
    );
  }

  /**
   * Function to update Project Data
   * @param projectId : number
   * @param projectData : ProjectData
   */

  async updateProjectData(
    projectId: number,
    projectData: ProjectData,
  ): Promise<ProjectData> {
    const edited = await this.projectDataRepository.findOne(projectId);
    if (!edited) {
      throw new NotFoundException('Project data is not found');
    }
    return await this.projectDataRepository.save({
      ...projectData,
      id: Number(projectId),
    });
  }

  /**
   * Function to delete project data
   * @param projectId : number
   */

  async deleteProjectData(projectId: number): Promise<void> {
    await this.projectDataRepository.delete(projectId);
  }

  /**
   * Function to get the list of form field based on the user_id
   * @param userId: number
   * @param divisionId: number
   */
  async getFormField(
    userId: number,
    divisionId: number,
  ): Promise<ProjectData[]> {
    return await getConnection().query(
      `SELECT u.name as uname, d.name as dname, dv.name as divsionname, dv.id as division_id, df.id, df.name, df.type FROM user as u JOIN department as d on d.id = u.department_id 
       JOIN division as dv on dv.department_id = u.department_id JOIN division_field as df on df.department_id = u.department_id and df.division_id = dv.id
       where u.id = ${userId} AND dv.id = ${divisionId}`,
    );
  }
}
