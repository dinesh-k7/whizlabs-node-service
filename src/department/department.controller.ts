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
import { Division } from './division.entity';
import { DivisionDto } from './dto/division-dto';

@Controller()
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * Function to create department based on the provided data
   * @param payload: Department
   */
  @Post('department/save')
  @ApiTags('Department')
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
  @Get('department')
  @ApiTags('Department')
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
  @Get('department/findByFilter')
  @ApiTags('Department')
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
  @Get('department/:departmentId')
  @ApiTags('Department')
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
  @Put('department/edit/:departmentId')
  @ApiTags('Department')
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
  @Delete('department/delete/:departmentId')
  @ApiTags('Department')
  @ApiOperation({ summary: 'Delete Department' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async deleteDepartment(
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ): Promise<any> {
    return this.departmentService.deleteDepartment(departmentId);
  }

  /**
   * Function to create division based on the provided data
   * @param payload: Divison
   */
  @Post('division/save')
  @ApiTags('Division')
  @ApiOperation({ summary: 'Create Division' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: DivisionDto })
  public async createDivision(@Body() payload: Division): Promise<any> {
    return this.departmentService.createDivision(payload);
  }

  /**
   * Function to delete division by id
   * @param divisionId: number
   */
  @Delete('division/delete/:divisionId')
  @ApiTags('Division')
  @ApiOperation({ summary: 'Delete Division' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async deleteDivision(
    @Param('divisionId', ParseIntPipe) divisionId: number,
  ): Promise<any> {
    return this.departmentService.deleteDivision(divisionId);
  }

  /**
   * Function to get Division by id
   * @param divisionId: number
   */
  @Get('division/:divisionId')
  @ApiTags('Division')
  @ApiOperation({ summary: 'Get Division' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getDivision(
    @Param('divisionId') divisionId: number,
  ): Promise<any> {
    return this.departmentService.getDivision(divisionId);
  }

  /**
   * Function to update division by id
   * @param payload: Division
   * @param divisionId: number
   */
  @Put('division/edit/:divisionId')
  @ApiTags('Division')
  @ApiOperation({ summary: 'Update Division' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: DivisionDto })
  public async updateDivision(
    @Body() payload: Division,
    @Param('divisionId', ParseIntPipe) divisionId: number,
  ): Promise<any> {
    return this.departmentService.updateDivision(divisionId, payload);
  }

  /**
   * Function to get all division by department id
   */
  @Get('department/division/:departmentId')
  @ApiTags('Division')
  @ApiOperation({ summary: 'Get all Division based on department Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getAll(
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ): Promise<any> {
    return this.departmentService.getDivisionList(departmentId);
  }
}
