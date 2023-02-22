import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LabTest {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.lab_tests)
  workspace: Workspace;
}
