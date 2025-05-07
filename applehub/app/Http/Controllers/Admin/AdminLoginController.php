<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminLoginController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials) && Auth::user()->is_admin) {
            return redirect('/admin/orders');
        }

        return back()->withErrors(['email' => 'Invalid credentials or not an admin']);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/admin/login');
    }
}
