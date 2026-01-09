// React から必要なフックを読み込む
// useState → 状態を持つため
// useEffect → コンポーネント表示後に処理を走らせるため
import { useEffect, useState } from "react";

// Task の型（タスク1件の形）を読み込む
import type { Task } from "../types/task";

// API 関数（フォルダIDを指定してタスク一覧を取る）
import { getTasksByFolder } from "../api/task";
import { TaskStatus } from "../types/task";
import "./TaskList.css";

// 親（Home）から受け取る props の型
// 「どのフォルダのタスクを表示するか」
type TaskListProps = {
  folderId: number;
};

export default function TaskList({ folderId }: TaskListProps) {
  // =========================
  // state（画面の状態）
  // =========================

  // タスク一覧を保持する state
  // 最初は空配列
  const [tasks, setTasks] = useState<Task[]>([]);

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
  }, [folderId]); // 👈 folderId が変わったら再実行

  // =========================
  // 表示部分（JSX）
  // =========================

  return (
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
          </li>
        ))}
      </ul>
    </div>
  );
}
