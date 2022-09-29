<?php


namespace App\Http\Controllers;


use App\Http\Responses\ArticleResponse;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ArticleController extends Controller
{
    /**
     * @var ArticleService
     */
    public ArticleService $articleService;

    /**
     * ArticleController constructor.
     * @param ArticleService $articleService
     */
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return ArticleResponse::collection(
          Article::all()
        );
    }

    /**
     * @param Request $request
     * @param Article $article
     * @return ArticleResponse
     */
    public function show(Request $request, Article $article)
    {
        return new ArticleResponse($article);
    }

    /**
     * @param Request $request
     * @return ArticleResponse
     */
    public function store(Request $request): ArticleResponse
    {
        return new ArticleResponse(
            $this->articleService->addNewArticle(
                $request->input('userId'),
                $request->input('title'),
                $request->input('text')
            )
        );
    }

    /**
     * @param Request $request
     * @param Article $article
     * @return ArticleResponse
     */
    public function update(Request $request, Article $article): ArticleResponse
    {
        return new ArticleResponse(
            $this->articleService->editArticle(
                $article,
                $request->input('title'),
                $request->input('text')
            )
        );
    }

    /**
     * @param Request $request
     * @param Article $article
     */
    public function destroy(Request $request, Article $article)
    {
        $this->articleService->deleteArticle($article);
    }
}
