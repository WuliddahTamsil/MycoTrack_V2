# Environment Variables Configuration

## Overview

Project ini menggunakan environment variables untuk mengkonfigurasi URL API backend. Ini memungkinkan aplikasi berjalan di development (localhost) dan production (Vercel) tanpa perlu mengubah kode.

## Environment Variables

### Required Variables

- **VITE_API_BASE_URL**: URL base untuk backend API (tanpa `/api` di akhir)
  - Development: `http://localhost:3000`
  - Production: `https://your-backend-domain.com`

### Optional Variables

- **VITE_ML_API_BASE_URL**: URL untuk Machine Learning API
  - Default: `{VITE_API_BASE_URL}/api/ml`
  
- **VITE_UPLOADS_BASE_URL**: URL untuk file uploads
  - Default: `{VITE_API_BASE_URL}` (tanpa `/api`)

## Setup untuk Local Development

1. Buat file `.env` di folder `frontend/` (jika belum ada)
2. Tambahkan konfigurasi berikut:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ML_API_BASE_URL=http://localhost:3000/api/ml
VITE_UPLOADS_BASE_URL=http://localhost:3000
```

3. Restart development server jika sedang berjalan

## Setup untuk Production (Vercel)

1. Login ke Vercel Dashboard
2. Pilih project Anda
3. Buka **Settings** > **Environment Variables**
4. Tambahkan variable berikut:

```
VITE_API_BASE_URL=https://your-backend-url.com
```

5. Redeploy aplikasi

## Cara Kerja

File `src/config/api.ts` akan:
- Membaca environment variables yang dimulai dengan `VITE_`
- Menggunakan default `http://localhost:3000` untuk development
- Menggunakan environment variable untuk production
- Menyediakan helper functions untuk mendapatkan URL lengkap

## Catatan

- **Vite hanya membaca environment variables yang dimulai dengan `VITE_`**
- Environment variables harus di-set sebelum build
- Untuk development, file `.env` akan otomatis dibaca oleh Vite
- Untuk production, set environment variables di platform hosting (Vercel, dll)

