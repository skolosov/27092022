<?php


namespace App\Services;


use App\Models\Article;

class ArticleService
{
    /**
     * @param int $userId
     * @param string|null $title
     * @param string|null $text
     * @return Article
     */
    public function addNewArticle(int $userId, ?string $title, ?string $text)
    {
        $article = new Article();
        $article->author_id = $userId;
        if ($title) {
            $article->title = $title;
        }
        if ($text) {
            $article->text = $text;
        }
        $article->save();

        return $article->refresh();
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
