export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  todos?: Todo[];
}

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: User;
}