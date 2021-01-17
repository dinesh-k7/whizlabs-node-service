import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly department_id: number;

  @ApiProperty()
  @IsBoolean()
  readonly active: boolean;

  @ApiProperty()
  readonly created_at?: Date;
}

export interface IUserLogin {
  username: string;
  password: string;
}
