// API Service for BharatRail Frontend
// This service handles all API calls to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
};

// Train APIs
export const trainAPI = {
  getAll: (line?: string, status?: string) => {
    let url = '/trains';
    const params = new URLSearchParams();
    if (line) params.append('line', line);
    if (status) params.append('status', status);
    if (params.toString()) url += `?${params.toString()}`;
    return apiCall(url);
  },
  getById: (id: string) => apiCall(`/trains/${id}`),
};

// Station APIs
export const stationAPI = {
  getAll: (line?: string) => {
    let url = '/stations';
    if (line && line !== 'all') url += `?line=${line}`;
    return apiCall(url);
  },
  getById: (id: string) => apiCall(`/stations/${id}`),
};

// Community Report APIs
export const reportAPI = {
  getAll: () => apiCall('/reports'),
  getById: (id: string) => apiCall(`/reports/${id}`),
  create: (trainId: string, delayType: string, additionalInfo?: string) =>
    apiCall('/reports', {
      method: 'POST',
      body: JSON.stringify({ trainId, delayType, additionalInfo }),
    }),
};

// Travel Suggestions APIs
export const suggestionAPI = {
  getAll: () => apiCall('/suggestions'),
};

// Route APIs
export const routeAPI = {
  getAll: () => apiCall('/routes'),
};

// Health check
export const healthCheck = () => apiCall('/health').catch(() => false);
