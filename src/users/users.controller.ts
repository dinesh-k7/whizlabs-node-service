import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Param,
  ParseIntPipe,
  Get,
  Put,
  Delete,
  Res,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

import { UsersService } from './users.service';
import { UserDto, IUserLogin } from './dto/user-dto';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Function to create user based on the provided data
   * @param userPayload: User
   */
  @Post('save')
  @ApiOperation({ summary: 'Create user account' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: UserDto })
  public async createUser(@Body() userPayload: User): Promise<any> {
    return this.userService.createUser(userPayload);
  }

  /**
   * Function to get all users
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getUsers(@Res() response: Response): Promise<any> {
    this.userService.getUsers().then((data) => {
      const [users, department] = data;
      if (users && users.length && department && department.length) {
        const userList = users.map((user) => {
          const filteredDepartment = department.find(
            (dpt) => dpt.id === user.department_id,
          );
          return {
            ...user,
            department_name: filteredDepartment ? filteredDepartment.name : '',
          };
        });

        response.send(userList);
      }
    });
  }

  /**
   * Function to get user by id
   * @param userId: number
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any> {
    return this.userService.getUser(userId);
  }

  /**
   * Function to update user by id
   * @param userPayload: User
   * @param userId: number
   */
  @Put('edit/:userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: UserDto })
  public async updateUser(
    @Body() userPayload: User,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any> {
    return this.userService.updateUser(userId, userPayload);
  }

  /**
   * Function to delete user by id
   * @param userId: number
   */
  @Delete('delete/:userId')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any> {
    return this.userService.deleteUser(userId);
  }

  /**
   * Function to check user name & password for admin
   * @param loginPayload: IUserLogin
   */
  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async adminLogin(
    @Body() loginPayload: IUserLogin,
    @Res() response: Response,
  ): Promise<any> {
    const { username, password } = loginPayload;
    if (
      username === this.configService.get<string>('ADMIN_USERNAME') &&
      password === this.configService.get<string>('ADMIN_PASSWORD')
    ) {
      response.send({
        success: true,
        token: Math.floor(Math.random() * 999999999999 + 1111111),
      });
    } else {
      response.status(401).send({
        success: false,
      });
    }
  }
}
