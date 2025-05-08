import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
  const { totalOrders, totalUsers, totalRevenue } = usePage().props as any;

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Buyers</h2>
          <p className="text-3xl mt-2">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl mt-2">₱{totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
