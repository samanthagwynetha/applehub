<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = [
        'order_id',
        'product_id',
        'name',
        'price',
        'quantity',
    ];
}
