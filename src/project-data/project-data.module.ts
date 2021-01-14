import { Module } from '@nestjs/common';
import { ProjectDataController } from './project-data.controller';
import { ProjectDataService } from './project-data.service';

@Module({
  controllers: [ProjectDataController],
  providers: [ProjectDataService]
})
export class ProjectDataModule {}
