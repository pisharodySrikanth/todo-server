## 30/04

- Finish auth
- Decide schema for todo entity

When calling a method of one service in another, should I separately import the type of the arguments? Is it correct to use dto type to 

# Module wise actions

- Auth
  - login
  - signup
  - forgot password
- Todo
  - CRUD


## Core MVP Features

## Core MVP Features

1. **User Authentication & Authorization**  
   - Register / login endpoints  
   - Password hashing (bcrypt)  
   - JWT-based auth + guards
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