import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

export default function AdminLogin() {
  const { errors } = usePage().props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/login', { email, password });
  };

  return (
    <>
      <Head title="Admin Login" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>

          {errors.email && <p className="text-red-600 mb-2">{errors.email}</p>}

          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
