// Reactのフック
import { useEffect, useState } from "react";
// 型
import type { Folder } from "../types/folder";
// API
import { getFolders, createFolder, deleteFolder } from "../api/folder";
import { createTask } from "../api/task";
// コンポーネント
import FolderModal from "../components/FolderModal";
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
  // フォルダモーダル
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  // タスクモーダルの開閉
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  // TaskListを再読み込み保存に成功したらTaskListに渡す
  const [reloadTasks, setReloadTasks] = useState(false);

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
  // フォルダ削除の処理
  // =========================
  const handleDeleteFolder = async (folderId: number) => {
    try {
      await deleteFolder(folderId);
      setFolders((prev) => 
        prev.filter((f) => f.id !== folderId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // JSX（画面表示）
  // =========================
  return (
    <div className="home">
      <h1 className="home-title">Todo アプリ</h1>
      <div className="home-content">
        <div className="folder-area">
          <div>
            <button onClick={() => setIsFolderModalOpen(true)}>
              フォルダ追加
            </button>
          </div>
          {/* フォルダ一覧 */}
          <FolderList
            folders={folders}
            onSelect={handleSelectFolder}
            onDelete={handleDeleteFolder}
          />
        </div>
        <div className="task-area">
          {/* フォルダが選ばれているときだけ表示 */}
          {selectedFolder ? (
            <>
              <h2>{selectedFolder.title} のタスク</h2>
              <button onClick={() => setIsTaskModalOpen(true)}>タスク追加</button>
              {/* タスク一覧 */}
              <TaskList 
              folderId={selectedFolder.id} 
              reload={reloadTasks}
              onDelete={() => setReloadTasks(prev => !prev)}
              />
            </>
          ):(
            <p>フォルダを選択してください</p>
          )}
        </div>
      </div>
      {/* フォルダモーダル */}
      <FolderModal
      isOpen={isFolderModalOpen}
      onClose={() => setIsFolderModalOpen(false)}
      onSubmit={async (title) => {
        try {
          await createFolder(title);
          const folders =await getFolders();
          setFolders(folders);
          setIsFolderModalOpen(false);
        } catch (err) {
          console.error(err);
        }
      }}
      />
      {/* タスクモーダル */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)} 
        onSubmit={async (task) => {
          if (!selectedFolder) return;
          try {
            await createTask(selectedFolder.id, task);
            setIsTaskModalOpen(false);
            setReloadTasks((prev) => !prev);
          } catch (err) {
            console.error(err);
          }
          console.log("作成するタスク：", task);
          // setIsTaskModalOpen(false);
          // 後でpost→再取得にする
        }}
      />
    </div>
  );
}