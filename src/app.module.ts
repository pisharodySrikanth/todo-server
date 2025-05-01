import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import RefreshToken from './auth/refreshToken.entity';
import { TodoModule } from './todo/todo.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import TodoList from './todo/todo-list.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'todos',
      entities: [User, RefreshToken, TodoList],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
