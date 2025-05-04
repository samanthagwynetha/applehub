import React from 'react';
import { Head } from '@inertiajs/react';

type OrderItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
};

type Order = {
  id: number;
  buyer_name: string;
  email: string;
  total: string;
  created_at: string;
  items: OrderItem[];
};

type Props = {
  orders: Order[];
};

export default function AdminOrders({ orders }: Props) {
  return (
    <>
      <Head title="Admin Orders" />
      <div className="min-h-screen p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded p-4 shadow-sm">
                <div className="mb-2">
                  <strong>Order #{order.id}</strong> – {order.buyer_name} ({order.email || 'no email'})  
                </div>
                <div className="mb-2">Total: ${order.total}</div>
                <div className="mb-2 text-sm text-gray-500">
                  Placed on: {new Date(order.created_at).toLocaleString()}
                </div>
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} – ${item.price} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
