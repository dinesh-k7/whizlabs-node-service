import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsString, IsNotEmpty, IsBoolean, IsEmail } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

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
