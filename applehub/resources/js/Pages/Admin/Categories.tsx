import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Categories() {
  const { categories, flash } = usePage().props as any;

  return (
    <AdminLayout>
      <Head title="Manage Categories" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          href="/admin/categories/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Category
        </Link>
      </div>

      {flash?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {flash.success}
        </div>
      )}

      <table className="w-full table-auto bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-right px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <tr key={category.id} className="border-t">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2 text-right">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="text-sm text-blue-600 hover:underline mr-2"
                >
                  Edit
                </Link>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this category?')) {
                      router.delete(`/admin/categories/${category.id}`);
                    }
                  }}
                  className="inline"
                >
                  <button type="submit" className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
