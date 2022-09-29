<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Article
 * @package App\Models
 *
 * @property-read int $id
 * @property int $author_id
 * @property string $title
 * @property string $text
 * @property User $user
 * @property string $author
 */
class Article extends Model
{
    use HasFactory;

    /**
     * @var string[] $fillable
     */
    protected $fillable = [
        'author_id',
        'title',
        'text',
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    /**
     * @return string
     */
    public function getAuthorAttribute(): string
    {
        $user = $this->user;
        return $user->name;
    }
}
