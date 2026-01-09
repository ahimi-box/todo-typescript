export enum TaskStatus {
  Todo = 0, //未着手
  Doing = 1, //着手中
  Done = 2, //完了
}

export type Task = {
  id: number;
  folder_id: number;
  title: string;
  status: number;
  due_date: string;
  created_at: string;
  updated_at: string;
}