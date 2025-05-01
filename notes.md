## 01/05

- Decide schema for todo and user entity
- Setup typeorm

## 30/04

- ~~Finish auth~~
- ~~Add validations~~

When calling a method of one service in another, should I separately import the type of the arguments? Is it correct to use dto type to

# Module wise actions

- Auth
  - login
  - signup
  - forgot password
- Todo
  - CRUD

## Core MVP Features

1. **User Authentication & Authorization**
   - ~~Register / login endpoints~~
   - ~~Password hashing (bcrypt)~~
   - ~~JWT-based auth + guards~~
2. **Todo CRUD**
   - Create / Read / Update / Delete Todos
   - Each Todo: `title`, `description`, `dueDate`, `status` (enum)
3. **Pagination & Filtering**
   - `GET /todos?page=&limit=&status=`
4. **Data Validation & Error Handling**
   - DTOs + `class-validator` pipes
   - Global exception filter
5. **Database Layer**
   - TypeORM (or Prisma) with MySQL
   - Entities, migrations, Repository pattern
6. **Config & Environment**
   - `@nestjs/config` for env vars
   - `.env.example`
7. **API Documentation**
   - Swagger module
8. **Basic Unit & E2E Tests**
   - Jest tests for controllers/services

## Basic Actions

- CRUD user
- Login / forgot password
- CRUD todo list against a user
- Re-order todo lists for a user
- CRUD todo against a list
- Re-order todos in a list
- Mark todo as complete / incomplete
- Get todo list by pagination
- Get todos by pagination
- Deleting a user should cause cascade delete of all of the user's todo lists and deletion of all todos in those lists
- Migration should be setup

## Later

- Notify user when a todo list is nearing due date/time
- Share todo list among users with read/write access control
- Changelog of changes for a list

## Schema

### User

- id(unique)
- name
- user_name(unique)
- password
- created_at
- updated_at

### Refresh Token

- id(unique)
- user_id(foreign key)
- token

## Todo

- id(unique)
- list_id(foreign key)
- content
- status(COMPLETED, NOT_COMPLETED)
- order_number
- deleted(0 or 1)

## Todo list

- id(unique)
- user_id(foreign key)
- title
- order_number
- deleted(0 or 1)
