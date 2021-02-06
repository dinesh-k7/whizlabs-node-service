import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class DivisionFieldDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  readonly created_at?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly division_id: number;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly isDisplay: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly department_id: number;
}
