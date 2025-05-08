import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function EditCategory({ category }: any) {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/categories/${category.id}`);
  };

  return (
    <AdminLayout>
      <Head title="Edit Category" />
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block font-semibold">Category Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={processing}
        >
          Update Category
        </button>
      </form>
    </AdminLayout>
  );
}
