<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = [
        'buyer_name',
        'email',
        'total',
    ];

    // If you prefer, you can also use $guarded to protect all other fields:
    // protected $guarded = [];
}
