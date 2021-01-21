import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectDataDto {
  @ApiProperty()
  readonly created_at?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly division_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly department_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly division_field_id: string;

  @ApiProperty()
  readonly data: any;
}
