<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'passenger_id',
        'driver_id',
        'status',
        'latitude',
        'longitude',
    ];
    public function passenger()
    {
        return $this->belongsTo(User::class);
    }
    public function driver()
    {
        return $this->belongsTo(User::class);
    }
}
