import FolderList from "../components/FolderList";
import TaskList from "../components/TaskList";
import { Folder } from "../types/folder";

export default function Home() {
  // const handleSelect = (folder: Folder) => {
  //   console.log("選択されたフォルダ:", folder);
  // };

  return (
    // <div>
    //   <h1>フォルダ一覧</h1>
    //   <FolderList onSelect={handleSelect} />
    // </div>
    <div>
      <TaskList folderId={1} />
    </div>
  );
}