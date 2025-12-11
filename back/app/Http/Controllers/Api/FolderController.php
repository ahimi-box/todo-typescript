<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Folder;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $folders = Folder::all();
      return response()->json($folders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      logger()->info('受信データ:', $request->all());
      $folder = Folder::create([
          'title' => $request->title,
      ]);
      logger()->info('作成されたフォルダ:', $folder->toArray());
      return response()->json($folder);
      // $folder = Folder::create([
      //   'title' => $request->title,
      // ]);
      // return response()->json($folder);
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
    public function update(Request $request, $id)
    {
      // フォルダをIDで取得
      $folder = Folder::findOrFail($id);
      // フォルダ名を新しい値に置き換える
      $folder->title = $request->title;
      // データベースに保存
      $folder->save();
      // 更新したフォルダをjsonで返す(200:成功)
      return response()->json($folder,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
      // フォルダをIDで取得
      $folder = Folder::find($id);
      if (!$folder) {
        return response()->json(['error' => 'Not Found'], 404);
      }
      $folder->delete();
      // 成功だけを返す場合は 204
      return response()->json(null,204);
    }
}
