import { User } from 'src/user/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TodoStatuses from './enums/statuses';
import TodoList from './todo-list.entity';

@Entity()
export default class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos)
  @JoinColumn({
    name: 'list_id',
  })
  list: TodoList;

  @Column({
    name: 'list_id',
  })
  listId: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: TodoStatuses,
    default: TodoStatuses.NOT_COMPLETED,
  })
  status: TodoStatuses;

  @Column({
    name: 'order_number',
  })
  orderNumber: number;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
