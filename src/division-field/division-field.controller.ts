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

import { DivisionFieldService } from './division-field.service';
import { DivisionFieldDto } from './dto/division-field-dto';
import { DivisionField } from './division-field.entity';

@Controller('division-field')
@ApiTags('Division Field')
export class DivisionFieldController {
  constructor(private readonly divisionFieldService: DivisionFieldService) {}

  /**
   * Function to get all division field by divisionId
   * @param departmentId: number
   */
  @Get('department/:departmentId')
  @ApiOperation({ summary: 'Get Division field by departmentId Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getAll(
    @Param('departmentId') departmentId: number,
  ): Promise<any> {
    return this.divisionFieldService.getAll(departmentId);
  }

  /**
   * Function to get division field by id
   * @param divisionFieldId: number
   */
  @Get(':divisionFieldId')
  @ApiOperation({ summary: 'Get Division field' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getDivisionField(
    @Param('divisionFieldId') divisionFieldId: number,
  ): Promise<any> {
    return this.divisionFieldService.getDivisionField(divisionFieldId);
  }

  /**
   * Function to update division field by id
   * @param payload: Division
   * @param divisionFieldId: number
   */
  @Put('edit/:divisionFieldId')
  @ApiOperation({ summary: 'Update Division' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: DivisionFieldDto })
  public async updateDivisionField(
    @Body() payload: DivisionField,
    @Param('divisionFieldId', ParseIntPipe) divisionFieldId: number,
  ): Promise<any> {
    return this.divisionFieldService.updateDivisionField(
      divisionFieldId,
      payload,
    );
  }

  /**
   * Function to delete Division field by id
   * @param divisionFieldId: number
   */
  @Delete('delete/:divisionFieldId')
  @ApiOperation({ summary: 'Delete Division field' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async deleteDivisionField(
    @Param('divisionFieldId', ParseIntPipe) divisionFieldId: number,
  ): Promise<any> {
    return this.divisionFieldService.deleteDivisionField(divisionFieldId);
  }

  /**
   * Function to create division based on the provided data
   * @param payload: Divison
   */
  @Post('save')
  @ApiOperation({ summary: 'Create Division Field' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: DivisionFieldDto })
  public async createDivision(@Body() payload: DivisionField): Promise<any> {
    return this.divisionFieldService.createDepartment(payload);
  }

  /**
   * Function to get division field by divisionId
   * @param divisionId: number
   */
  @Get('division/:divisionId')
  @ApiOperation({ summary: 'Get Division field' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getDivisionFieldById(
    @Param('divisionId') divisionId: number,
  ): Promise<any> {
    return this.divisionFieldService.getDivisionFieldById(divisionId);
  }

  /**
   * Function to get division field by divisionId
   * @param divisionId: number
   */
  @Get('all/:divisionId')
  @ApiOperation({ summary: 'Get Division field by division id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async get(@Param('divisionId') divisionId: number): Promise<any> {
    return this.divisionFieldService.getDivisionFieldById(divisionId);
  }
}
