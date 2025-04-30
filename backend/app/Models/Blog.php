<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'image',
        "slug",
        "user_id"
    ];


    public function user()
    {
        return $this->belongsTo(User::class); // assuming Blog has user_id foreign key
    }
}
