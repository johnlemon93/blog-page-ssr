let baseUrl;

if (typeof window === 'undefined') {
    baseUrl = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3080';
} else {
    const hostname = window && window.location && window.location.hostname;
    if (hostname) {
        baseUrl = '';
    }
}

export const API_ROOT = baseUrl;