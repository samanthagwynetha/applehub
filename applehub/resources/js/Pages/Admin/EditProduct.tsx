import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function EditProduct({ product }: { product: any }) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/products/${product.id}`);
  };

  return (
    <AdminLayout>
      <Head title="Edit Product" />
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={data.price}
            onChange={(e) => setData('price', e.target.value)}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={processing}
        >
          Save Changes
        </button>
      </form>
    </AdminLayout>
  );
}
