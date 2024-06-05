export type TokenObtainPair = {
  email: string;
  password: string;
}

export type TokenResponse = {
  readonly access: string;
  readonly refresh: string;
}

export type Register = {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

export type User = {
  email: string;
  first_name: string;
  last_name: string;
}

export type TodoResponse = {
  readonly id: number;
  readonly description: string;
  readonly done: boolean;
}

export type CreateTodo = {
  description: string;
}

export type Todo = {
  readonly id: number | undefined;
  description: string;
  done: boolean;
}

export type TokenRefresh = {
  refresh: string;
}

export type TokenVerify = {
  token: string;
}
