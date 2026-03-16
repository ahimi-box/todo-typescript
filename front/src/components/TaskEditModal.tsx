import { useState } from "react";
import type { Task } from "../types/task";

type Props = {
  task: Task;
  onClose: () => void;
  onSubmit: (task: Task) => void;
};

export default function TaskEditModal({task, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date ?? "");

  const handleSubmit = () => {
    onSubmit({
      ...task,
      title,
      status,
      due_date: dueDate || null,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>タスク編集</h2>
        <div>
          <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <label>ステータス表示</label>
          <select 
          value={status}
          onChange={(e)=> setStatus(Number(e.target.value))}
          >
            <option value={0}>未着手</option>
            <option value={1}>着手中</option>
            <option value={2}>完了</option>
          </select>
        </div>
        
        <div>
          <label>期限</label>
          <input 
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
    
  );
}