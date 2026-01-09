// Reactのフック
import { useEffect, useState } from "react";
// 型
import type { Folder } from "../types/folder";
// API
import { getFolders } from "../api/folder";
// コンポーネント
import FolderList from "../components/FolderList";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import "./Home.css";

export default function Home() {
  // =========================
  // state（画面の状態）
  // =========================

  // フォルダ一覧
  const [folders, setFolders] = useState<Folder[]>([]);
  // 選択中のフォルダ
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  // タスクモーダルの開閉
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // =========================
  // 初回表示時にフォルダ取得
  // =========================
  useEffect(() => {
    getFolders()
    .then((folders) => {
      setFolders(folders);
    })
    .catch((err) => {
      console.error("フォルダ取得エラー：", err);
    });
  }, []);

  // =========================
  // フォルダ選択時の処理
  // =========================
  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder);
  };

  // =========================
  // JSX（画面表示）
  // =========================
  return (
    <div className="home">
      <h1 className="home-title">Todo アプリ</h1>
      <div className="home-content">
        <div className="folder-area">
          {/* フォルダ一覧 */}
          <FolderList
            folders={folders}
            onSelect={handleSelectFolder}
          />
        </div>
        <div className="task-area">
          {/* フォルダが選ばれているときだけ表示 */}
          {selectedFolder ? (
            <>
              <h2>{selectedFolder.title} のタスク</h2>
              <button onClick={() => setIsTaskModalOpen(true)}>タスク追加</button>
              {/* タスク一覧 */}
              <TaskList folderId={selectedFolder.id} />
            </>
          ):(
            <p>フォルダを選択してください</p>
          )}
        </div>
      </div>
      {/* タスクモーダル */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)} 
        onSubmit={(task) => {
          console.log("作成するタスク：", task);
          setIsTaskModalOpen(false);
          // 後でpost→再取得にする
        }}
      />
    </div>
  );
}