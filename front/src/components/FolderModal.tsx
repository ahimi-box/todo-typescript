import { useState, useEffect } from "react";
import "./FolderModal.css";

type Props = {
  isOpen: boolean;
  initialTitle?: string;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export default function FolderModal({
  isOpen,
  initialTitle,
  onClose,
  onSubmit,
}: Props) {
  const [title,setTitle] = useState("");

  useEffect(() => {
    if(isOpen) {
      setTitle(initialTitle ?? "");
    }
  }, [isOpen, initialTitle]);
  if(!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>フォルダ名</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="modal-buttons">
          <button onClick={() => onSubmit(title)}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}
