<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('blogs', 'public');

        return response()->json([
            'message' => 'Image uploaded successfully',
            // 'url' => Storage::url($path),
            'url' => asset('storage/' . $path),
            'path' => $path,
        ]);
    }
}
