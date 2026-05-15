<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return Inertia::render('Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'required|string',
            'is_published' => 'boolean',
        ]);

        Article::create($validated);
        return redirect()->back();
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->back();
    }
}