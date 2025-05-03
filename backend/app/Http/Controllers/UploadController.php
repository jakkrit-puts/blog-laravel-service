<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Image;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:4096',
        ]);

        $image = $request->file('image');
        $filename = Str::uuid().'.webp';

        $imagePath = $image->getPathname();

        $image = Image::load($imagePath)
            ->width(800)
            ->save(storage_path("app/public/blogs/{$filename}"), 85, 'webp');

        return response()->json([
            'message' => 'Image uploaded successfully.',
            'url' => asset("storage/blogs/{$filename}"),
            'path' => "blogs/{$filename}",
        ]);
    }
}
