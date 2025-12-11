<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FolderController;
use App\Http\Controllers\Api\TaskController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// フォルダ
Route::get('/folders', [FolderController::class, 'index']);
Route::post('/folders', [FolderController::class, 'store']);
Route::put('/folders/{id}', [FolderController::class, 'update']);
Route::delete('/folders/{id}', [FolderController::class, 'destroy']);

// タスク
Route::get('/tasks', [TaskController::class, 'index']);
// フォルダごとのタスク取得
Route::get('/folders/{folderId}/tasks',[TaskController::class, 'tasksByFolder']);
// タスク新規作成
Route::post('/folders/{folderId}/tasks',[TaskController::class, 'store']);
// タスク更新
Route::put('/folders/{folderId}/tasks/{taskId}',[TaskController::class, 'update']);
// タスク削除
Route::delete('/folders/{folderId}/tasks/{taskId}',[TaskController::class, 'destroy']);