<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    protected $fillable = [
        'rater_id',
        'rated_user_id',
        'rating',
    ];
    public function rater()
    {
        return $this->belongsTo(User::class);
    }
    public function rated()
    {
        return $this->belongsTo(User::class);
    }
}
