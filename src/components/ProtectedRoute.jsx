// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * Wrapper that renders children only if the user is authenticated.
 * Otherwise redirects to the login page.
 */
export default function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
