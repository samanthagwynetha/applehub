import React from 'react';
import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline block">Dashboard</Link>
          <Link href="/admin/orders" className="text-blue-600 hover:underline block">Orders</Link>
          <Link href="/admin/products" className="text-blue-600 hover:underline block">Products</Link>
          <Link href="/admin/categories" className="text-blue-600 hover:underline block">Categories</Link>

        
          <form method="POST" action="/admin/logout">
            <button type="submit" className="mt-4 text-red-600 hover:underline">Logout</button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
