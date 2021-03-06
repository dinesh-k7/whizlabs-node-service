import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
// import {
//   paginate,
//   Pagination,
//   IPaginationOptions,
// } from 'nestjs-typeorm-paginate';
import { forkJoin } from 'rxjs';

import { User } from './user.entity';
import { Department } from '../department/department.entity';
import { IUserLogin } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  /**
   * Function to create user
   * @param user : User
   */
  async createUser(user: User): Promise<any> {
    return await this.usersRepository.save(user);
  }

  /**
   * Function to get the list of all users
   *
   */

  async getUsers(): Promise<[User[], Department[]]> {
    return await forkJoin([
      this.usersRepository.find(),
      this.departmentRepository.find(),
    ]).toPromise();
  }

  /**
   * Function to get user by id
   * @param _id : number
   */

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      where: [{ id: _id }],
    });
  }

  /**
   * Function to update user
   * @param userId : number
   * @param user : User
   */

  async updateUser(userId: number, user: User): Promise<User> {
    const editedUser = await this.usersRepository.findOne(userId);
    if (!editedUser) {
      throw new NotFoundException('User is not found');
    }
    return await this.usersRepository.save({ ...user, id: Number(userId) });
  }

  /**
   * Function to delete user
   * @param userId : number
   */

  async deleteUser(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  /**
   * Function to get user based on the emailid and password
   * @param loginPayload: IUserLogin
   */
  async userLogin(loginPayload: IUserLogin): Promise<User[]> {
    const { username, password } = loginPayload;

    return await this.usersRepository.find({
      where: [{ email: username, password: password }],
    });
  }

  /**
   * Function to get the list of division based on the user_id
   * @param userId: number
   */
  async getDivisions(userId: number): Promise<any> {
    return await getConnection().query(
      `SELECT dv.name as division_name, dv.id as division_id FROM division as dv 
       JOIN department as d on d.id = dv.department_id 
       JOIN user as u on u.department_id = d.id  
       where u.id = ${userId}`,
    );
  }
}
