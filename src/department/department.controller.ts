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
  Query,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department-dto';
import { Department } from './department.entity';

@Controller('department')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * Function to create department based on the provided data
   * @param payload: Department
   */
  @Post('save')
  @ApiOperation({ summary: 'Create Department' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: DepartmentDto })
  public async createDepartment(@Body() payload: Department): Promise<any> {
    return this.departmentService.createDepartment(payload);
  }

  /**
   * Function to get all departments
   */
  @Get()
  @ApiOperation({ summary: 'Get all Department' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getDepartments(): Promise<any> {
    return this.departmentService.getDepartments();
  }

  /**
   * Function to check whether the Department exist or not
   * @param name: string
   */
  @Get('/findByFilter')
  @ApiOperation({ summary: 'Get Department by name' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getDepartmentByName(@Query('name') name: string): Promise<any> {
    return this.departmentService.getDepartmentByName(name);
  }

  /**
   * Function to get Department by id
   * @param departmentId: number
   */
  @Get(':departmentId')
  @ApiOperation({ summary: 'Get Department' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getDepartment(
    @Param('departmentId') departmentId: number,
  ): Promise<any> {
    return this.departmentService.getDepartment(departmentId);
  }

  /**
   * Function to update department by id
   * @param payload: Department
   * @param departmentId: number
   */
  @Put('edit/:departmentId')
  @ApiOperation({ summary: 'Update Department' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: DepartmentDto })
  public async updateDepartment(
    @Body() payload: Department,
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ): Promise<any> {
    return this.departmentService.updateDepartment(departmentId, payload);
  }

  /**
   * Function to delete department by id
   * @param departmentId: number
   */
  @Delete('delete/:departmentId')
  @ApiOperation({ summary: 'Delete Department' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async deleteDepartment(
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ): Promise<any> {
    return this.departmentService.deleteDepartment(departmentId);
  }
}
