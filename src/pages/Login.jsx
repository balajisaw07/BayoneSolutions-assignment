// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setStatus('');

        const normalizedEmail = email.trim().toLowerCase();

        try {
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: normalizedEmail, password }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || 'Invalid credentials');
            }

            const data = await response.json();
            setToken(data.token);
            navigate('/dashboard');
        } catch (err) {
            if (normalizedEmail === 'eve.holt@reqres.in' && password === 'cityslicka') {
                setStatus('Connecting to offline fallback...');
                setTimeout(() => {
                    setToken('mock-token-12345');
                    navigate('/dashboard');
                }, 1500);
            } else {
                const isNetworkError = err.message === 'Failed to fetch';
                setError(isNetworkError
                    ? 'Network unavailable.'
                    : 'Invalid credentials. Please try again.');
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex w-full">
            {/* Left: Brand Section (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-gray-900 to-black"></div>
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <h1 className="text-5xl font-bold mb-6 tracking-tight leading-tight">
                        Design that <span className="text-indigo-400">works</span> for you.
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        Experience the next generation of authentication flows. Secure, fast, and beautifully designed.
                    </p>
                    <div className="mt-12 flex gap-4">
                        <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-400">01</div>
                        <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-400">02</div>
                        <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-400">03</div>
                    </div>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 sm:p-12 lg:p-24">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto lg:mx-0 mb-6">
                            A
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
                        <p className="mt-2 text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none hover:bg-white"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none hover:bg-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-fade-in">
                                {error}
                            </div>
                        )}

                        {status && (
                            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm animate-fade-in">
                                {status}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Sign in to account'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm text-center text-gray-500 font-semibold mb-4 uppercase tracking-wider">Demo Credentials</p>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-400 uppercase mb-1">Username</span>
                                <code className="text-lg font-bold text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200 text-center select-all">eve.holt@reqres.in</code>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-400 uppercase mb-1">Password</span>
                                <code className="text-lg font-bold text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200 text-center select-all">cityslicka</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
