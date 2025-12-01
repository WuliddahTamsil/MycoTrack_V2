# 🚀 Panduan Deployment Lengkap - Backend & ML Service

Panduan step-by-step untuk deploy backend dan machine learning service ke cloud.

## 📋 Daftar Isi

1. [Deploy Backend ke Vercel](#1-deploy-backend-ke-vercel)
2. [Deploy ML Service ke Railway/Render](#2-deploy-ml-service-ke-railwayrender)
3. [Konfigurasi Environment Variables](#3-konfigurasi-environment-variables)
4. [Update Frontend](#4-update-frontend)
5. [Testing](#5-testing)

---

## 1. Deploy Backend ke Vercel

### Langkah 1: Siapkan Repository

1. **Pastikan semua file sudah di-commit ke GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Langkah 2: Deploy ke Vercel

1. **Buka Vercel Dashboard:**
   - Kunjungi: https://vercel.com
   - Login dengan GitHub account Anda

2. **Import Project:**
   - Klik **"Add New..."** > **"Project"**
   - Pilih repository GitHub Anda
   - Atau klik **"Import Git Repository"**

3. **Konfigurasi Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** (kosongkan)
   - **Output Directory:** (kosongkan)
   - **Install Command:** `npm install`

4. **Environment Variables:**
   - Klik **"Environment Variables"**
   - Tambahkan:
     ```
     CORS_ORIGIN=https://your-frontend.vercel.app
     ML_SERVICE_URL=https://your-ml-service.railway.app
     PORT=3000
     ```
   - **Catatan:** Ganti URL dengan URL sebenarnya setelah deploy

5. **Deploy:**
   - Klik **"Deploy"**
   - Tunggu proses build selesai
   - **Copy URL deployment** (contoh: `https://mycotrack-backend.vercel.app`)

### Langkah 3: Update Vercel Configuration

1. **Buat file `vercel.json` di folder `backend/`:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

2. **Update `server.js` untuk Vercel:**
   - Pastikan menggunakan `module.exports = app;` di akhir file
   - Atau gunakan `server-vercel.js` yang sudah ada

---

## 2. Deploy ML Service ke Railway/Render

### Opsi A: Deploy ke Railway (Recommended)

#### Langkah 1: Setup Railway Account

1. **Buka Railway:**
   - Kunjungi: https://railway.app
   - Login dengan GitHub account

2. **Create New Project:**
   - Klik **"New Project"**
   - Pilih **"Deploy from GitHub repo"**
   - Pilih repository Anda

#### Langkah 2: Configure Service

1. **Add Service:**
   - Klik **"New"** > **"GitHub Repo"**
   - Pilih repository
   - Railway akan auto-detect Python project

2. **Configure Build:**
   - **Root Directory:** `machine learning/Project`
   - **Build Command:** `pip install -r requirements_ml_api.txt`
   - **Start Command:** `python ml_api_service.py`

3. **Environment Variables:**
   - Klik **"Variables"** tab
   - Tambahkan:
     ```
     PORT=5000
     MODEL_PATH=weights/best.pt
     ```

4. **Deploy:**
   - Railway akan otomatis deploy
   - Tunggu build selesai
   - **Copy Public URL** (contoh: `https://mycotrack-ml.railway.app`)

### Opsi B: Deploy ke Render

#### Langkah 1: Setup Render Account

1. **Buka Render:**
   - Kunjungi: https://render.com
   - Login dengan GitHub account

2. **Create New Web Service:**
   - Klik **"New +"** > **"Web Service"**
   - Connect GitHub repository

#### Langkah 2: Configure Service

1. **Settings:**
   - **Name:** `mycotrack-ml-service`
   - **Environment:** Python 3
   - **Root Directory:** `machine learning/Project`
   - **Build Command:** `pip install -r requirements_ml_api.txt`
   - **Start Command:** `python ml_api_service.py`

2. **Environment Variables:**
   - Klik **"Environment"** tab
   - Tambahkan:
     ```
     PORT=5000
     MODEL_PATH=weights/best.pt
     ```

3. **Deploy:**
   - Klik **"Create Web Service"**
   - Tunggu build selesai
   - **Copy URL** (contoh: `https://mycotrack-ml.onrender.com`)

---

## 3. Konfigurasi Environment Variables

### Di Vercel (Backend)

1. **Buka Vercel Dashboard** > Project > Settings > Environment Variables

2. **Tambahkan:**
   ```
   CORS_ORIGIN=https://your-frontend.vercel.app,https://your-frontend.vercel.app/*
   ML_SERVICE_URL=https://your-ml-service.railway.app
   PORT=3000
   ```

### Di Vercel (Frontend)

1. **Buka Vercel Dashboard** > Frontend Project > Settings > Environment Variables

2. **Tambahkan:**
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app
   VITE_ML_API_BASE_URL=https://your-ml-service.railway.app/api/ml
   ```

---

## 4. Update Frontend

Setelah backend dan ML service di-deploy:

1. **Update Environment Variables di Vercel Frontend:**
   - Masuk ke Vercel Dashboard
   - Pilih project frontend
   - Settings > Environment Variables
   - Update `VITE_API_BASE_URL` dengan URL backend yang baru

2. **Redeploy Frontend:**
   - Klik **"Redeploy"** di tab Deployments
   - Atau push commit baru untuk trigger auto-deploy

---

## 5. Testing

### Test Backend

1. **Health Check:**
   ```
   https://your-backend.vercel.app/api/health
   ```
   Harus return: `{"status":"ok","message":"Backend is running"}`

2. **Test Login:**
   - Buka frontend di browser
   - Coba login dengan akun yang sudah ada
   - Harus berhasil tanpa error

### Test ML Service

1. **Health Check:**
   ```
   https://your-ml-service.railway.app/health
   ```
   Harus return: `{"status":"healthy",...}`

2. **Test dari Frontend:**
   - Login sebagai Petani
   - Buka Monitoring
   - Upload foto dan klik "Deteksi"
   - Harus muncul hasil deteksi

---

## 🔧 Troubleshooting

### Backend tidak bisa diakses

1. **Cek CORS:**
   - Pastikan `CORS_ORIGIN` di Vercel sudah benar
   - Harus include domain frontend

2. **Cek Logs:**
   - Buka Vercel Dashboard > Deployments > Logs
   - Cari error message

### ML Service tidak bisa diakses

1. **Cek Model File:**
   - Pastikan `weights/best.pt` ada di repository
   - File harus di-commit ke GitHub

2. **Cek Build Logs:**
   - Buka Railway/Render Dashboard > Logs
   - Cari error saat build atau runtime

### Frontend tidak bisa connect ke backend

1. **Cek Environment Variables:**
   - Pastikan `VITE_API_BASE_URL` sudah di-set
   - URL harus tanpa `/api` di akhir

2. **Cek Network Tab:**
   - Buka Browser DevTools > Network
   - Lihat request yang gagal
   - Cek error message

---

## 📝 Checklist Deployment

- [ ] Backend di-deploy ke Vercel
- [ ] ML Service di-deploy ke Railway/Render
- [ ] Environment variables di-set di Vercel (Backend)
- [ ] Environment variables di-set di Vercel (Frontend)
- [ ] CORS dikonfigurasi dengan benar
- [ ] Backend health check berhasil
- [ ] ML Service health check berhasil
- [ ] Frontend bisa login/register
- [ ] ML Detection berfungsi di frontend

---

## 🆘 Butuh Bantuan?

Jika ada masalah saat deployment:
1. Cek logs di platform hosting
2. Pastikan semua environment variables sudah benar
3. Pastikan semua file sudah di-commit ke GitHub
4. Cek dokumentasi platform hosting (Vercel, Railway, Render)

