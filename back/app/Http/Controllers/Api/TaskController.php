<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $tasks = Task::all();
      return response()->json($tasks);
    }

    // フォルダごとのタスク取得
    public function tasksByFolder($folderId)
    {
      $tasks = Task::where('folder_id', $folderId)->get();
      return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $folderId)
    {
      $task = Task::create([
        'folder_id' => $folderId,
        'title' => $request->title,
        'status' => 0,
        'due_date' => $request->due_date,
      ]);
      return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $folderId, $taskId)
    {
      // タスクをIDで取得
      $task = Task::findOrFail($taskId);
      if (!$task) {
        return response()->json(['error' => 'Task not found'], 404);
      }
      // タスクを新しい値に置き換える
      $task->title = $request->title;
      $task->status = $request->status;
      $task->due_date = $request->due_date;
      // データベースに保存
      $task->save();
      // 更新したタスクをjsonで返す(200:成功)
      return response()->json($task, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
      // タスクをIDで取得
      $task = Task::find($id);
      if (!$task) {
        return response()->json(['error' => 'Not Found'], 404);
      }
      $task->delete();
      // 成功だけを返す場合は 204
      return response()->json(null, 204);
    }
}
