import { useEffect, useState } from "react";
import { Folder } from "../types/folder";
import { getFolders } from "../api/folder";
import "./FolderList.css";

type Props = {
  // フォルダがクリックされたときに親に通知する関数
  onSelect: (folder: Folder) => void;
};

export default function FolderList({ onSelect }: Props) {
  // フォルダ一覧を保存するstate
  const [folders, setFolders] = useState<Folder[]>([]);
  // データ取得中かどうか
  const [loading, setLoading] = useState(true);
  // 初回レンダリング時にフォルダ一覧を取得
  useEffect(() =>  {
    getFolders()
    .then((data) => {
      // APIから返ってきたフォルダ配列を保存
      setFolders(data);
    })
    .catch((error) => {
      console.error("フォルダ取得失敗", error);
    })
    .finally(() => {
      // 成功しても失敗してもローディング終了
      setLoading(false);
    });
  }, []);
  // 読み込み中の表示
  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <ul className="folder-list">
      {folders.map((folder) => (
        <li 
          key={folder.id}
          onClick={() => onSelect(folder)} // 親に通知 
        >
          {folder.title}
        </li>
      ))}
    </ul>
  )
}