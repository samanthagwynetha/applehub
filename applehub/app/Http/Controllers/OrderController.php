<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
class OrderController extends Controller
{
    public function create()
{
    $cart = session('cart', []);
    return Inertia::render('Checkout', ['cart' => array_values($cart)]);
}

public function store(Request $request)
{
    $cart = session('cart', []);

    if (empty($cart)) {
        return redirect('/cart')->with('error', 'Cart is empty');
    }

    $total = collect($cart)->sum(fn($item) => $item['quantity'] * $item['price']);

    $order = Order::create([
        'buyer_name' => $request->input('name'),
        'email' => $request->input('email'),
        'total' => $total,
    ]);

    foreach ($cart as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item['id'],
            'name' => $item['name'],
            'price' => $item['price'],
            'quantity' => $item['quantity'],
        ]);
    }

    session()->forget('cart');

    return redirect('/')->with('success', 'Order placed successfully!');
}
}
