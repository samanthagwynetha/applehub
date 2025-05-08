import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ProductIndex() {
  const { products } = usePage().props as { products: Product[] };

  return (
    <AdminLayout>
      <Head title="Product List" />
      <h1 className="text-2xl font-bold mb-6">All iPhones</h1>

      <div className="space-y-4">
        {products.length === 0 && <p>No products found.</p>}

        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-blue-600 font-bold">₱{product.price}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
