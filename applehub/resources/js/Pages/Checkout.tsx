import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
};

type Props = {
  cart: CartItem[];
};

export default function Checkout({ cart }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post('/checkout', {
      name,
      email,
    });
  };

  return (
    <>
      <Head title="Checkout" />
      <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email (optional)</label>
            <input
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}
