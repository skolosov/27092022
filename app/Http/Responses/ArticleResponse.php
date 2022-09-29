<?php

namespace App\Http\Responses;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Article
 */
class ArticleResponse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'authorId' => $this->author_id,
            'author' => $this->author,
            'title' => $this->title,
            'text' => $this->text,
        ];
    }


}
