export type Role = 'ADMIN' | 'USER';

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface UserRequest {
  email: string;
  password: string;
  role: Role;
}