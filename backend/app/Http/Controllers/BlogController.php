<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Cache::remember('blogs', 60, function () {
            return Blog::with('user:id,name')->latest()->get();
        });

        return response()->json($blogs);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'You are not authorized. Admin Only'], 403);
        }

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'blog_type' => 'required',
            'content' => 'required',
            'image' => 'nullable|string',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->title,)));

        $data = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->image,
            'description' => $request->description,
            'blog_type' => $request->blog_type,
            'slug' => $slug,
            'user_id' => $request->user()->id,
        ]);

        Cache::forget('blogs');
        return response()->json(['message' => 'Blog created Succesfully', 'data' => $data], 201);

    }

    public function show($slug)
    {
        $cacheKey = 'blog_' . $slug;

        $blog = Cache::remember($cacheKey, 60, function () use ($slug) {
            return Blog::with('user:id,name')->where('slug', $slug)->first();
        });

        if (!$blog) {
            return response()->json(['error' => 'Blog not found'], 404);
        }

        Cache::forget('blogs');
        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
            $user = $request->user();
            if ($user->role !== 'admin') {
                return response()->json(['message' => 'You are not authorized. Admin Only'], 403);
            }

            $request->validate([
                'title' => 'required',
                'content' => 'required',
                'description' => 'required',
                'blog_type' => 'required',
                'image' => 'nullable|string',
            ]);

            $blog = Blog::find($id);

            if (!$blog) {
                return response()->json(['error' => 'Blog not found'], 404);
            }

            $blog->fill($request->only('title', 'content', 'description', 'blog_type'));

            if ($request->has('image') && !empty($request->image)) {
                if ($blog->image) {
                    Storage::disk('public')->delete($blog->image);
                }
                $blog->image = $request->image;
            }

            $blog->save();

            Cache::forget('blogs');
            return response()->json(['message' => 'Blog updated Succesfully.', 'blog' => $blog]);
    }

    public function destroy(Request $request, int $id)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'You are not authorized. Admin Only'], 403);
        }

        $blog = Blog::findOrFail($id);

        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        Cache::forget('blogs');
        return response()->json(['message' => 'Blog Deleted Succesfully.']);
    }
}

