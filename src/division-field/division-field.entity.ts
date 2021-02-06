import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

@Entity()
export class DivisionField extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  created_at: Date;

  @Column({ length: 20 })
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  division_id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  isDisplay: boolean;
}
