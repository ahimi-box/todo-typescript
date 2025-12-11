<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  use HasFactory;
  
  protected $fillable = ['folder_id', 'title', 'status', 'due_date']; 

  // Taskは１つのFolderに属する
  public function folder() {
    return $this->belongsTo(Folder::class);
  }
}
