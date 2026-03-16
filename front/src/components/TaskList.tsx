// React から必要なフックを読み込む
// useState → 状態を持つため
// useEffect → コンポーネント表示後に処理を走らせるため
import { useEffect, useState } from "react";

// Task の型（タスク1件の形）を読み込む
import type { Task } from "../types/task";

// API 関数（フォルダIDを指定してタスク一覧を取る）
import { getTasksByFolder, deleteTask, updateTask } from "../api/task";
import { TaskStatus } from "../types/task";
import TaskEditModal from "./TaskEditModal";
import "./TaskList.css";

// 親（Home）から受け取る props の型
// 「どのフォルダのタスクを表示するか」
type TaskListProps = {
  folderId: number;
  reload: boolean;
  onDelete: () => void;
};

export default function TaskList({ folderId, reload, onDelete }: TaskListProps) {
  // =========================
  // state（画面の状態）
  // =========================

  // タスク一覧を保持する state
  // 最初は空配列
  const [tasks, setTasks] = useState<Task[]>([]);
  // edit
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // =========================
  // 副作用（API 通信）
  // =========================

  // folderId が変わったときに実行される
  useEffect(() => {
    // 念のため folderId が無い場合は何もしない
    if (!folderId) return;

    // API を呼んでタスク一覧を取得
    getTasksByFolder(folderId)
      .then((tasks) => {
        // 取得したタスクを state に保存
        // → state が変わるので画面が再描画される
        setTasks(tasks);
      })
      .catch((err) => {
        console.error("タスク取得エラー:", err);
      });
  }, [folderId, reload]); // 👈 folderId が変わったら再実行

  // =========================
  // タスク編集
  // =========================
  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  // =========================
  // タスクupdate
  // =========================
  const handleUpdate = async (task: Task) => {
    try {
      await updateTask(folderId, task.id, task.title, task.status, task.due_date);
      setEditingTask(null);
      onDelete(); //relod
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // タスク削除
  // =========================
  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(folderId, taskId);
      onDelete(); //削除後に再取得
    } catch (err) {
      console.error("削除エラー：", err);
    }
  }
 
  // =========================
  // 表示部分（JSX）
  // =========================

  return (
    <>
      <div>
        <h2>タスク一覧</h2>

        {/* タスクが1件も無い場合 */}
        {tasks.length === 0 && <p>タスクはありません</p>}

        {/* タスク一覧を表示 */}
        <ul>
          {tasks.map((task) => (
            // key は React のお約束（id を使う）
            <li key={task.id}>
              {task.title}
              {/* ステータス表示（仮） */}
              {task.status === TaskStatus.Done && " ✅"}
              <button onClick={() => handleEdit(task)}>
                編集
              </button>
              <button onClick={() => handleDelete(task.id)}>
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
       {/* モーダル */}
      {editingTask && (
        <TaskEditModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdate}
        />
      )}
    </>
  );
}
