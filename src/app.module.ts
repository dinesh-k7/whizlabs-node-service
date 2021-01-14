import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { DepartmentModule } from './department/department.module';
import { DivisionService } from './division/division.service';
import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DepartmentModule,
  ],
  providers: [DivisionService],
})
export class AppModule {}
