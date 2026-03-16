import type { Folder } from "../types/folder";
import "./FolderList.css";

type FolderListProps = {
  folders: Folder[];
  // フォルダがクリックされたときに親に通知する関数
  onSelect: (folder: Folder) => void;
  onDelete: (folderId: number) => void;
};

export default function FolderList({ folders, onSelect, onDelete}: FolderListProps) {

  return (
    <ul className="folder-list">
      {folders.map((folder) => (
        <li 
          key={folder.id} 
          className="folder-item"
        >
          {/*  親に通知 */}
          <span
          className="folder-title" 
          onClick={() => onSelect(folder)}
            >
            {folder.title}
            </span>
    
          <button
          className="delete-btn"
           onClick={() => onDelete(folder.id)}>
            削除
          </button>
        </li>
      ))}
    </ul>
  )
}