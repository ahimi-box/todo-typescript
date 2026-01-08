import {useEffect, useState} from "react";
import "./TaskModal.css";

type Props = {
  isOpen: Boolean;
  initialTitle?: string;
  initialStatus?: number;
  initialDueDate?: string;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    status: number;
    due_date: string | null;
  }) => void;
};

export default function TaskModal({
  isOpen,
  initialTitle,
  initialStatus,
  initialDueDate,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(0);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle ?? "");
      setStatus(initialStatus ?? 0);
      setDueDate(initialDueDate ?? "");
    }
  }, [isOpen, initialTitle, initialStatus, initialDueDate]);
  if (!isOpen) return null;
  
  return (
    <div>
      <div>
        <h2>タスク</h2>
        <input type="text" placeholder="タスク名" value={title} onChange={(e) => setTitle(e.target.value)} />

        <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
          <option value="{0}">未着手</option>
          <option value="{1}">着手中</option>
          <option value="{2}">完了</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

        <div className="modal-buttons">
          <button onClick={() => onSubmit({title, status, due_date: dueDate || null,})}>
            保存
          </button>
          <button>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}