// API Configuration
// This file centralizes all API endpoint configurations

// Get API base URL from environment variable or use default
const getApiBaseUrl = (): string => {
  // In Vite, environment variables are prefixed with VITE_
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envUrl) {
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  }
  
  // Default to localhost for development
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api';
  }
  
  // For production, if no env var is set, try to use relative path
  // This assumes backend is deployed on the same domain
  return '/api';
};

// Get ML API base URL from environment variable or use default
const getMlApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_ML_API_BASE_URL;
  
  if (envUrl) {
    return envUrl;
  }
  
  // Default to localhost for development
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api/ml';
  }
  
  // For production, use the same base as API
  const apiBase = getApiBaseUrl().replace('/api', '');
  return `${apiBase}/api/ml`;
};

// Get uploads base URL
const getUploadsBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_UPLOADS_BASE_URL;
  
  if (envUrl) {
    return envUrl;
  }
  
  // Default to localhost for development
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // For production, use the same base as API
  const apiBase = getApiBaseUrl().replace('/api', '');
  return apiBase;
};

export const API_BASE_URL = getApiBaseUrl();
export const ML_API_BASE_URL = getMlApiBaseUrl();
export const UPLOADS_BASE_URL = getUploadsBaseUrl();

// Helper function to get full URL for uploads
export const getUploadUrl = (path: string): string => {
  if (!path) return '';
  
  // If already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${UPLOADS_BASE_URL}/${cleanPath}`;
};

// Helper function to get full URL for API endpoints
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Helper function to get full URL for ML API endpoints
export const getMlApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${ML_API_BASE_URL}/${cleanEndpoint}`;
};

console.log('API Configuration:', {
  API_BASE_URL,
  ML_API_BASE_URL,
  UPLOADS_BASE_URL,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD
});

