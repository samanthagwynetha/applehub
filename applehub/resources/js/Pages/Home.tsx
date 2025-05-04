import React from 'react';
import { Link, Head } from '@inertiajs/react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

type Props = {
  products: Product[];
};

export default function Home({ products }: Props) {
  return (
    <>
      <Head title="iPhoneHub - Home" />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Featured Apple Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`} // Link to the detail page
              className="bg-white p-4 rounded-lg shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-4 text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="mt-2 text-lg font-bold">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
