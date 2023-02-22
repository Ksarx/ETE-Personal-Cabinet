import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class KpiIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  kpi: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.kps)
  workspace: Workspace;
}
