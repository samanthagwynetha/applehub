<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();

        return Inertia::render('Home', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('ProductDetail', [
            'product' => $product,
        ]);
    }

}
