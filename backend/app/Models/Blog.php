<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'image',
        "slug",
        "user_id",
        "description",
        "blog_type"
    ];


    public function user()
    {
        return $this->belongsTo(User::class); // assuming Blog has user_id foreign key
    }

    public function getImageAttribute($value)
    {
        if (!$value) return null;
        return asset('storage/' . $value);
    }
}
