import React from 'react';
import { Head } from '@inertiajs/react';

export default function AdminOrders({ orders }: any) {
  return (
    <>
      <Head title="Orders" />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">All Orders</h1>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border p-4 rounded shadow">
                <p><strong>{order.buyer_name}</strong> ({order.email})</p>
                <p>Total: ${order.total}</p>
                <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
                <ul className="ml-4 list-disc">
                  {order.items.map((item: any) => (
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
