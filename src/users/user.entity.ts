import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  created_at: Date;

  @Column()
  @IsBoolean()
  active: boolean;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  department_id: number;
}
