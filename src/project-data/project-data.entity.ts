import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class ProjectData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  division_id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @Column()
  @IsNotEmpty()
  division_field_id: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  created_at: Date;

  @Column('text')
  @IsNotEmpty()
  data: string;
}
