<?php


namespace App\Services;


use App\Models\Article;

class ArticleService
{
    /**
     * @param int $userId
     * @param string $title
     * @param string $text
     * @return Article
     */
    public function addNewArticle(int $userId, string $title, string $text)
    {
        /** @var Article $article */
        $article = Article::query()->create([
            'author_id' => $userId,
            'title' => $title,
            'text' => $text,
        ]);

        return $article;
    }

    /**
     * @param Article $article
     * @param string $title
     * @param string $text
     * @return Article
     */
    public function editArticle(Article $article, string $title, string $text)
    {
        $article = $article->fill([
            'title' => $title,
            'text' => $text,
        ]);
        $article->save();

        return $article;
    }

    /**
     * @param Article $article
     */
    public function deleteArticle(Article $article)
    {
        $article->delete();
    }
}
