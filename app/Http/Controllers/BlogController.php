<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        return Blog::with('user:id,name')->latest()->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'You are not authorized.'], 403);
        }

        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|string',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->title,)));

        return Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->image,
            'slug' => $slug,
            'user_id' => $request->user()->id,
        ]);
    }

    public function show($slug)
    {
            $blog = Blog::with('user:id,name')->where('slug', $slug)->first();

            if (!$blog) {
                return response()->json(['error' => 'Blog not found'], 404);
            }

            return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
            $user = $request->user();
            if ($user->role !== 'admin') {
                return response()->json(['message' => 'You are not authorized.'], 403);
            }

            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'image' => 'nullable|string',
            ]);

            $blog = Blog::find($id);

            if (!$blog) {
                return response()->json(['error' => 'Blog not found'], 404);
            }

            $blog->fill($request->only('title', 'content'));

            if ($request->has('image')) {
                if ($blog->image) {
                    Storage::disk('public')->delete($blog->image);
                }
                $blog->image = $request->image;
            }

            $blog->save();

            return response()->json(['message' => 'Blog updated.', 'blog' => $blog]);
    }



    public function destroy(Blog $blog)
    {

        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'You are not authorized.'], 403);
        }

        if ($blog->image) Storage::disk('public')->delete($blog->image);
        $blog->delete();
        return response()->json(['message' => 'Blog Deleted.']);
    }
}

