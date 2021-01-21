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
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { ProjectDataService } from './project-data.service';
import { ProjectDataDto } from './dto/project-data-dto';
import { ProjectData } from './project-data.entity';

@Controller('project-data')
@ApiTags('Project Data')
export class ProjectDataController {
  constructor(private readonly projectDataService: ProjectDataService) {}

  /**
   * Function to get all project data for admin view
   *
   */
  @Get('')
  @ApiOperation({ summary: 'Get all project data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getAll(): Promise<any> {
    return this.projectDataService.getAll();
  }

  /**
   * Function to get project data by id
   * @param id: number
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get Project data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getProjectData(@Param('id') id: number): Promise<any> {
    return this.projectDataService.getProjectData(id);
  }

  /**
   * Function to update project data by id
   * @param payload: ProjectData
   * @param projectId: number
   */
  @Put('edit/:projectId')
  @ApiOperation({ summary: 'Update Project data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: ProjectDataDto })
  public async updateProjectData(
    @Body() payload: ProjectData,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<any> {
    return this.projectDataService.updateProjectData(projectId, payload);
  }

  /**
   * Function to delete project data by id
   * @param projectId: number
   */
  @Delete('delete/:projectId')
  @ApiOperation({ summary: 'Delete Project data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async deleteProjectData(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<any> {
    return this.projectDataService.deleteProjectData(projectId);
  }

  /**
   * Function to create project data based on the provided data
   * @param payload: ProjectData
   */
  @Post('save')
  @ApiOperation({ summary: 'Create Project data' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: ProjectDataDto })
  public async createProjectData(@Body() payload: ProjectData): Promise<any> {
    return this.projectDataService.createProjectData(payload);
  }

  /**
   * Function to get project data by user_id
   * @param userId: number
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get Project data by userId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getProjectByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any> {
    return this.projectDataService.getProjectByUser(userId);
  }

  /**
   * Function to get the form field for division based on the divisonId and userId
   * @param userId: number
   * @param divisionId: number
   */
  @Get('form-field/:userId/:divisionId')
  @ApiOperation({ summary: 'Get Project data by userId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getFormField(
    @Param('userId') userId: number,
    @Param('divisionId') divisionId: number,
  ): Promise<any> {
    return this.projectDataService.getFormField(userId, divisionId);
  }
}
