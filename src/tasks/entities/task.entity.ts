import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
    comment: 'The name of the task',
  })
  name: string;

  @Column({
    type: 'text',
    name: 'description',
    comment: 'The description of the task',
  })
  description: string;

  @Column({
    type: 'boolean',
    name: 'is_completed',
    comment: 'The status of the task',
    default: false,
  })
  isCompleted: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'file_url',
    comment: 'The URL of the file attached to the task',
    nullable: true,
  })
  fileUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
