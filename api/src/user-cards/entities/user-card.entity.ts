import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  isNotify: boolean;

  @ManyToOne(() => User, (user) => user.cards, {
    onDelete: 'CASCADE',
    nullable: true,
    deferrable: 'INITIALLY DEFERRED',
  })
  user: User;
}
