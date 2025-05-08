import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CreateCategory() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/categories');
  };

  return (
    <AdminLayout>
      <Head title="Add Category" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Category</h1>
        <Link
          href="/admin/categories"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Categories
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Save Category
        </button>
      </form>
    </AdminLayout>
  );
}
