import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Orders() {
  const { orders } = usePage().props as any;

  const handleLogout = () => {
    router.post('/admin/logout');
  };

  return (
    <AdminLayout>
      <Head title="Admin Orders" />
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="border rounded-lg p-4 shadow">
              <p><strong>Buyer:</strong> {order.user?.name}</p>
              <p><strong>Email:</strong> {order.user?.email}</p>
              <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Items:</strong></p>
              <ul className="list-disc list-inside ml-4">
                {order.items.map((item: any) => (
                  <li key={item.id}>
                    {item.product.name} — Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    </AdminLayout>
  );
}
