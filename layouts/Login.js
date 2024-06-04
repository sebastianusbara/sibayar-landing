import Link from "next/link";
import Cta from "./components/Cta";
import React, { useState } from 'react';

const Dialog = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Dialog Title</h2>
      <p className="mb-4">This is the dialog content.</p>
      <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">
        Close
      </button>
    </div>
  </div>
);

function Login({ data }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailLogin = (e) => {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('Email Login Success', userCredential);
        })
        .catch((error) => {
          console.error('Email Login Error', error);
        });
    };
  
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}

export default Login;
