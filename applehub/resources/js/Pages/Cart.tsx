import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type Props = {
  cart: CartItem[];
};

export default function Cart({ cart }: Props) {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <>
      <Head title="Your Cart" />
      <div className="min-h-screen bg-gray-50 p-6">
        <Link href="/" className="text-blue-600 underline mb-6 inline-block">
          ← Continue Shopping
        </Link>

        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded shadow">
                <img src={item.image} className="w-24 h-24 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p className="text-green-600 font-bold">${item.price}</p>
                </div>
                <form method="POST" action={`/cart/remove/${item.id}`}>
                <input type="hidden" name="_token" value={(window as any).csrfToken} />
                  <button
                    type="submit"
                    className="text-red-600 hover:underline ml-4"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))}

            <div className="text-xl font-bold text-right">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
