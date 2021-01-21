import { Module } from '@nestjs/common';
import { ProjectDataController } from './project-data.controller';
import { ProjectDataService } from './project-data.service';
import { ProjectData } from './project-data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProjectDataController],
  providers: [ProjectDataService],
  imports: [TypeOrmModule.forFeature([ProjectData])],
})
export class ProjectDataModule {}
