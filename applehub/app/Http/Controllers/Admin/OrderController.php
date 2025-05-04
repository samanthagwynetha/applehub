<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->latest()->get();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }
}
