<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            // foreignId()->constrained() フォルダとタスクを紐づける外部キー
            // constrained('folders') この folder_id は folders テーブルの id に紐づく外部キーです という意味。
            // onDelete('cascade') フォルダが削除されたら、そのフォルダにあるタスクも全部削除する という設定。
            $table->foreignId('folder_id')->constrained('folders')->onDelete('cascade');
            $table->string('title',100);
            $table->integer('status')->default(0); //0:未着手
            $table->date('due_date')->nullable(); //空（null）を許可する → 期限なしタスクも作れる。
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
