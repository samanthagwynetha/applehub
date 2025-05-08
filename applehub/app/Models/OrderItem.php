<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public function product()
    {
        return $this->belongsTo(\App\Models\Product::class);
    }

    public function order()
    {
        return $this->belongsTo(\App\Models\Order::class);
    }

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
