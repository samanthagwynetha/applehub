import React from 'react';
import { Head, Link } from '@inertiajs/react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  return (
    <>
      <Head title={product.name} />
      <div className="min-h-screen bg-gray-50 p-6">
        <Link href="/" className="text-blue-600 underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded mb-6"
          />
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-600">${product.price}</p>

          <form method="POST" action={`/cart/add/${product.id}`}>
            <input type="hidden" name="_token" value={(window as any).Laravel.csrfToken} />
            <button
                type="submit"
                className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
                Add to Cart
            </button>
         </form>

        </div>
      </div>
    </>
  );
}
