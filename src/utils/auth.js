// src/utils/auth.js

/**
 * Store token in localStorage.
 */
/**
 * Store token in localStorage with an expiry time.
 * @param {string} token 
 * @param {number} durationInSeconds Default 3600 (1 hour)
 */
export function setToken(token, durationInSeconds = 3600) {
    localStorage.setItem('auth_token', token);
    const expiryTime = Date.now() + durationInSeconds * 1000;
    localStorage.setItem('auth_token_expiry', expiryTime);
}

/**
 * Retrieve token from localStorage.
 * Checks for expiry and clears if expired.
 */
export function getToken() {
    const token = localStorage.getItem('auth_token');
    const expiry = localStorage.getItem('auth_token_expiry');

    if (!token) return null;

    if (expiry && Date.now() > parseInt(expiry, 10)) {
        clearToken();
        return null;
    }

    return token;
}

/**
 * Remove token and expiry from localStorage.
 */
export function clearToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_expiry');
}

/**
 * Check whether a valid, non-expired token exists.
 */
export function isAuthenticated() {
    return !!getToken();
}
