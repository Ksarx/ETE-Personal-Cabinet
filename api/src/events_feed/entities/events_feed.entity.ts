import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class EventsFeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  where: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.events)
  workspace: Workspace;
}
