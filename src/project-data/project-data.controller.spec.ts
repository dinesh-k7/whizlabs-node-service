import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDataController } from './project-data.controller';

describe('ProjectDataController', () => {
  let controller: ProjectDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectDataController],
    }).compile();

    controller = module.get<ProjectDataController>(ProjectDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
