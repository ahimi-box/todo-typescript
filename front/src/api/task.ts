import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:8000/api";

export const getTasksByFolder = async (folderId: number): Promise<Task[]> => {
  const res = await axios.get(`${API_URL}/folders/${folderId}/tasks`);
  return res.data;
};

export const createTask = async (
  folderId: number,
  title:string,
  due_date: string
): Promise<Task> => {
  const res = await axios.post(`${API_URL}/folders/${folderId}/tasks`, {
    title,
    due_date,
  });
  return res.data;
};

export const updateTask = async (
  folderId: number,
  taskId: number,
  title: string,
  status: number,
  due_date: string
): Promise<Task> => {
  const res = await axios.put(
    `${API_URL}/folders/${folderId}/tasks/${taskId}`,
    { title, status, due_date }
  );
  return res.data;
};

export const deleteTask = async (
  folderId: number,
  taskId: number
): Promise<void> => {
  await axios.delete(`${API_URL}/folders/${folderId}/tasks/${taskId}`);
};