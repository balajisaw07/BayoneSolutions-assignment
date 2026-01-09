// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/auth';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
            Sign Out
        </button>
    );
}
