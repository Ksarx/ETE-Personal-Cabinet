import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ShiftLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  shift_date: string;

  @Column()
  employee: string;

  @Column()
  post: string;

  @Column()
  status: string;

  @Column({ type: 'timestamptz' })
  end_date: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.shift_logs)
  workspace: Workspace;
}
