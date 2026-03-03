javascript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'http://localhost:8000/ws'; // SockJS expects http/https endpoint
export const MAP_CENTER = [49.0, 31.5]; // Center of Ukraine
export const MAP_ZOOM = 6;