# ⚡ Quick Start Deployment

Panduan cepat untuk deploy backend dan ML service dalam 10 menit.

## 🎯 Prerequisites

- GitHub account
- Vercel account (gratis)
- Railway account (gratis) atau Render account (gratis)

## 🚀 Langkah Cepat

### 1. Deploy Backend (5 menit)

1. **Buka:** https://vercel.com
2. **Login** dengan GitHub
3. **New Project** > Import dari GitHub repo Anda
4. **Settings:**
   - Root Directory: `backend`
   - Framework: Other
   - Build Command: (kosongkan)
5. **Environment Variables:**
   ```
   CORS_ORIGIN=https://your-frontend.vercel.app
   ML_SERVICE_URL=https://your-ml-service.railway.app
   ```
6. **Deploy** dan copy URL (contoh: `https://xxx.vercel.app`)

### 2. Deploy ML Service (5 menit)

#### Opsi A: Railway (Recommended)

1. **Buka:** https://railway.app
2. **Login** dengan GitHub
3. **New Project** > Deploy from GitHub repo
4. **Add Service:**
   - Root Directory: `machine learning/Project`
   - Build Command: `pip install -r requirements_ml_api.txt`
   - Start Command: `python ml_api_service.py`
5. **Variables:**
   ```
   PORT=5000
   ```
6. **Deploy** dan copy Public URL

#### Opsi B: Render

1. **Buka:** https://render.com
2. **Login** dengan GitHub
3. **New Web Service** > Connect repo
4. **Settings:**
   - Root Directory: `machine learning/Project`
   - Build: `pip install -r requirements_ml_api.txt`
   - Start: `python ml_api_service.py`
5. **Deploy** dan copy URL

### 3. Update Frontend (2 menit)

1. **Buka Vercel Dashboard** > Frontend project
2. **Settings** > Environment Variables
3. **Update:**
   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app
   VITE_ML_API_BASE_URL=https://your-ml-service.railway.app/api/ml
   ```
4. **Redeploy** frontend

## ✅ Test

1. Buka frontend URL
2. Coba login/register
3. Jika berhasil, deployment selesai! 🎉

## 🆘 Masalah?

- **Backend error:** Cek logs di Vercel
- **ML service error:** Cek logs di Railway/Render
- **Frontend tidak connect:** Pastikan environment variables sudah benar

Lihat `DEPLOYMENT_GUIDE.md` untuk detail lengkap.

