# Panduan Deployment ke Vercel

## Setup Environment Variables di Vercel

Setelah project di-deploy ke Vercel, Anda perlu menambahkan environment variables untuk menghubungkan frontend dengan backend API.

### Langkah-langkah:

1. **Login ke Vercel Dashboard**
   - Buka https://vercel.com
   - Login ke akun Anda
   - Pilih project yang sudah di-deploy

2. **Tambahkan Environment Variables**
   - Klik pada tab **Settings**
   - Scroll ke bagian **Environment Variables**
   - Klik **Add New**

3. **Tambahkan Variable Berikut:**

   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

   Ganti `https://your-backend-url.com` dengan URL backend Anda yang sudah di-deploy.
   
   **Contoh:**
   - Jika backend di-deploy di Railway: `https://your-app.railway.app`
   - Jika backend di-deploy di Render: `https://your-app.onrender.com`
   - Jika backend di-deploy di Heroku: `https://your-app.herokuapp.com`
   - Jika backend di-deploy di Vercel juga: `https://your-backend.vercel.app`

4. **Tambahkan Variable untuk ML API (Optional)**
   
   Jika ML API di-deploy terpisah:
   ```
   VITE_ML_API_BASE_URL=https://your-ml-api-url.com/api/ml
   ```

5. **Tambahkan Variable untuk Uploads (Optional)**
   
   Jika uploads di-host terpisah:
   ```
   VITE_UPLOADS_BASE_URL=https://your-backend-url.com
   ```

6. **Redeploy**
   - Setelah menambahkan environment variables, klik **Redeploy** pada tab **Deployments**
   - Atau push commit baru ke repository untuk trigger automatic redeploy

## Catatan Penting

- **Environment variables harus diawali dengan `VITE_`** agar bisa diakses di frontend Vite
- **Jangan sertakan `/api` di akhir URL** karena sudah ditambahkan otomatis di konfigurasi
- **Pastikan backend sudah di-deploy dan bisa diakses** sebelum menambahkan URL-nya
- **CORS harus dikonfigurasi di backend** untuk mengizinkan request dari domain Vercel

## Testing

Setelah deployment:
1. Buka URL Vercel Anda
2. Coba login/register
3. Jika masih error, cek:
   - Environment variables sudah benar
   - Backend sudah running dan bisa diakses
   - CORS sudah dikonfigurasi di backend
   - Network tab di browser untuk melihat error detail

## Troubleshooting

### Error: "Tidak dapat terhubung ke server"
- Pastikan `VITE_API_BASE_URL` sudah di-set di Vercel
- Pastikan backend sudah running dan bisa diakses
- Cek apakah URL backend benar (tanpa `/api` di akhir)

### Error: CORS
- Pastikan backend mengizinkan origin dari domain Vercel
- Tambahkan domain Vercel ke whitelist CORS di backend

### Error: 404 Not Found
- Pastikan endpoint di backend sudah benar
- Pastikan URL di environment variable tidak ada typo

