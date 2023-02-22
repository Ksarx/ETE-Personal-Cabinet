import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  status: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.incidents)
  workspace: Workspace;
}
