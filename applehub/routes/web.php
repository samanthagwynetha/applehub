<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Models\Product;
use App\Models\Category;

// Public homepage
Route::get('/', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Authenticated user routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Cart
    Route::post('/cart/add/{product}', [CartController::class, 'add']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/remove/{productId}', [CartController::class, 'remove']);

    // Orders
    Route::get('/checkout', [OrderController::class, 'create']);
    Route::post('/checkout', [OrderController::class, 'store']);
});

// Auth routes
require __DIR__.'/auth.php';

// Admin auth routes
Route::get('/admin/login', [AdminLoginController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminLoginController::class, 'login']);
Route::post('/admin/logout', [AdminLoginController::class, 'logout'])->name('admin.logout');

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {

    // Admin Dashboard
    Route::get('/admin/dashboard', function () {
        $orders = \App\Models\Order::with('items')->get();
        $totalOrders = $orders->count();
        $totalUsers = \App\Models\User::where('is_admin', false)->count();
        $totalRevenue = $orders->flatMap->items->sum(fn ($item) => $item->quantity * $item->price);

        return Inertia::render('Admin/Dashboard', [
            'totalOrders' => $totalOrders,
            'totalUsers' => $totalUsers,
            'totalRevenue' => $totalRevenue,
        ]);
    });

    // Admin Orders
    Route::get('/admin/orders', [AdminOrderController::class, 'index']);

    // Admin Products View
    Route::get('/admin/products', function () {
        $products = Product::all();
    
        return Inertia::render('Admin/Products', [
            'products' => $products,
        ]);
    });

    // Admin Product Add
    Route::get('/admin/products/create', function () {
        return Inertia::render('Admin/CreateProduct');
    })->name('admin.products.create');
    
    Route::post('/admin/products', function (Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);
    
        Product::create($validated);
    
        return redirect('/admin/products')->with('success', 'Product created!');
    })->name('admin.products.store');

    // Admin Product Edit
    Route::get('/admin/products/{product}/edit', function (Product $product) {
        return Inertia::render('Admin/EditProduct', [
            'product' => $product,
        ]);
    })->name('admin.products.edit');
    
    Route::put('/admin/products/{product}', function (Request $request, Product $product) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);
    
        $product->update($validated);
    
        return redirect('/admin/products')->with('success', 'Product updated!');
    })->name('admin.products.update');
    
    // Admin Product Delete
    Route::delete('/admin/products/{product}', function (Product $product) {
        $product->delete();
        return redirect('/admin/products')->with('success', 'Product deleted!');
    })->name('admin.products.destroy');

    // Admin CATEGORY
    Route::get('/admin/categories', function () {
        return Inertia::render('Admin/Categories', [
            'categories' => Category::all(),
        ]);
    })->name('admin.categories.index');
    
    Route::get('/admin/categories/create', function () {
        return Inertia::render('Admin/CreateCategory');
    })->name('admin.categories.create');
    
    Route::post('/admin/categories', function (Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);
    
        Category::create($validated);
    
        return redirect()->route('admin.categories.index')->with('success', 'Category created!');
    })->name('admin.categories.store');

    // Show Edit Form
    Route::get('/admin/categories/{id}/edit', function ($id) {
        $category = \App\Models\Category::findOrFail($id);
        return Inertia::render('Admin/EditCategory', [
            'category' => $category,
        ]);
    })->name('admin.categories.edit');

    // Update Category
    Route::put('/admin/categories/{id}', function (\Illuminate\Http\Request $request, $id) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

       Category::findOrFail($id)->update($validated);

        return redirect('/admin/categories')->with('success', 'Category updated!');
    })->name('admin.categories.update');

    // Delete Category
    Route::delete('/admin/categories/{id}', function ($id) {
        Category::findOrFail($id)->delete();

        return redirect('/admin/categories')->with('success', 'Category deleted!');
    })->name('admin.categories.destroy');

});
