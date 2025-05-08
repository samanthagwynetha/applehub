import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function CreateProduct() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/products');
  };

  return (
    <AdminLayout>
      <Head title="Add Product" />
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={data.price}
            onChange={e => setData('price', e.target.value)}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={processing}
        >
          Add Product
        </button>
      </form>
    </AdminLayout>
  );
}
