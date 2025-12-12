import axios from "axios";
import type { Folder } from "../types/folder";

const API_URL = "http://localhost:8000/api/folders";

export const getFolders = async (): Promise<Folder[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createFolder = async (title: string): Promise<Folder> => {
  const res = await axios.post(API_URL, { title });
  return res.data;
};

export const updateFolder = async (id: number, title: string): Promise<Folder> => {
  const res = await axios.put(`${API_URL}/${id}`, { title });
  return res.data;
};

export const deleteFolder = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
