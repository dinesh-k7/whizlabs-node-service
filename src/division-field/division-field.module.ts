import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DivisionField } from './division-field.entity';
import { DivisionFieldService } from './division-field.service';
import { DivisionFieldController } from './division-field.controller';
import { Division } from '../department/division.entity';

@Module({
  providers: [DivisionFieldService],
  controllers: [DivisionFieldController],
  imports: [
    TypeOrmModule.forFeature([DivisionField]),
    TypeOrmModule.forFeature([Division]),
  ],
})
export class DivisionFieldModule {}
