import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { DepartmentModule } from './department/department.module';
import { ProjectDataModule } from './project-data/project-data.module';
import { DivisionFieldModule } from './division-field/division-field.module';
import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({ connectTimeoutMS: 9999999999 }),
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DepartmentModule,
    ProjectDataModule,
    DivisionFieldModule,
  ],
})
export class AppModule {}
