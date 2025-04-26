export type User = {
  id: number;
  userName: string;
  name: string;
  password: string;
};

export type UserWithoutPassword = Pick<User, Exclude<keyof User, 'password'>>;
