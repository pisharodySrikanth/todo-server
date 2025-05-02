import { User } from 'src/user/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Todo from './todo.entity';

@Entity()
export default class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  title: string;

  @Column({ name: 'order_number' })
  orderNumber: number;

  @OneToMany(() => Todo, (todo) => todo.list)
  todos: Todo[];

  @DeleteDateColumn({ name: 'delete_date' })
  deleteDate: Date;
}
