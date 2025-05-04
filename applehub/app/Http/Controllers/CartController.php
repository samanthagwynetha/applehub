<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
    
        return Inertia::render('Cart', [
            'cart' => array_values($cart),
        ]);
    }
    
    public function add(Request $request, Product $product)
    {
        $cart = session()->get('cart', []);
    
        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += 1;
        } else {
            $cart[$product->id] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'quantity' => 1,
            ];
        }
    
        session()->put('cart', $cart);
        return redirect()->back()->with('success', 'Product added to cart!');
    }
    
    public function remove($productId)
    {
        $cart = session()->get('cart', []);
    
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
        }
    
        return redirect()->back()->with('success', 'Product removed from cart!');
    }
}
