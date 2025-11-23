# 🚀 Deployment Guide - MycoTrack V2

## 📦 Platform yang Digunakan

| Komponen | Platform | Alasan |
|----------|----------|--------|
| **Frontend** | Vercel | Optimized untuk React/Vite, gratis, auto-deploy dari GitHub |
| **Backend** | Railway / Render | Support Node.js Express, gratis dengan limit |
| **ML Service** | Railway / Render | Support Python Flask, gratis dengan limit |

---

## ⚡ Quick Start (5 Menit)

### 1. Deploy Frontend ke Vercel

**Via Dashboard (Paling Mudah):**

1. Buka https://vercel.com dan login
2. Klik **"Add New Project"**
3. Import repository: `WuliddahTamsil/MycoTrack_V2`
4. **PENTING**: Set **Root Directory** = `frontend`
5. Framework akan auto-detect sebagai **Vite**
6. Klik **Deploy**

✅ Frontend akan live dalam 2-3 menit!

**URL akan seperti**: `https://mycotrack-v2.vercel.app`

---

### 2. Deploy Backend ke Railway

1. Buka https://railway.app dan login (gratis dengan $5 credit)
2. Klik **"New Project"** → **"Deploy from GitHub repo"**
3. Pilih repository: `WuliddahTamsil/MycoTrack_V2`
4. **PENTING**: Set **Root Directory** = `backend`
5. Railway akan auto-detect sebagai Node.js
6. Set **Start Command**: `npm start`
7. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://your-frontend.vercel.app` (isi setelah frontend deploy)
8. Klik **Deploy**

✅ Backend akan live dalam 3-5 menit!

**URL akan seperti**: `https://mycotrack-backend.railway.app`

---

### 3. Deploy ML Service ke Railway

1. Di project Railway yang sama, klik **"New Service"**
2. **Deploy from GitHub repo** → Pilih repository yang sama
3. **PENTING**: Set **Root Directory** = `machine learning/Project`
4. Railway akan auto-detect sebagai Python
5. Set **Start Command**: `python ml_api_service.py`
6. **Environment Variables**:
   - `FLASK_ENV` = `production`
7. Klik **Deploy**

✅ ML Service akan live dalam 5-10 menit!

**URL akan seperti**: `https://mycotrack-ml-service.railway.app`

---

### 4. Update Environment Variables

#### Di Backend (Railway):
1. Buka Backend service → **Variables**
2. Update:
   - `CORS_ORIGIN` = `https://your-frontend.vercel.app`
   - `ML_SERVICE_URL` = `https://your-ml-service.railway.app`

#### Di Frontend (Vercel):
1. Buka Frontend project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_API_URL` = `https://your-backend.railway.app`
3. **Redeploy** (Vercel akan auto-redeploy)

---

## 🔧 Alternative: Deploy ke Render

Jika Railway tidak tersedia, gunakan Render (gratis):

### Backend:
- **New** → **Web Service**
- Root Directory: `backend`
- Environment: `Node`
- Build: `npm install`
- Start: `npm start`

### ML Service:
- **New** → **Web Service**
- Root Directory: `machine learning/Project`
- Environment: `Python 3`
- Build: `pip install -r requirements_ml_api.txt`
- Start: `python ml_api_service.py`

---

## 📝 File Konfigurasi yang Sudah Dibuat

✅ `vercel.json` - Konfigurasi Vercel untuk frontend
✅ `railway.json` - Konfigurasi Railway (root)
✅ `backend/railway.json` - Konfigurasi Railway untuk backend
✅ `machine learning/Project/railway.json` - Konfigurasi Railway untuk ML
✅ `DEPLOYMENT.md` - Dokumentasi lengkap
✅ `QUICK_DEPLOY.md` - Panduan cepat
✅ `backend/server.js` - Updated untuk support `process.env.PORT` dan CORS

---

## ⚠️ Catatan Penting

1. **File Storage**: 
   - Uploads akan hilang setelah restart (ephemeral storage)
   - Untuk production, gunakan cloud storage (AWS S3, Cloudinary)

2. **Database**:
   - JSON files tidak ideal untuk production
   - Pertimbangkan PostgreSQL/MongoDB di Railway

3. **ML Models**:
   - File `.pt` besar, gunakan cloud storage atau CDN

4. **CORS**:
   - Pastikan backend allow origin dari Vercel frontend

---

## 🎯 Checklist

- [ ] Frontend ter-deploy di Vercel
- [ ] Backend ter-deploy di Railway/Render  
- [ ] ML Service ter-deploy di Railway/Render
- [ ] Environment variables sudah di-set
- [ ] CORS origin sudah di-update
- [ ] Test koneksi frontend → backend
- [ ] Test koneksi backend → ML service

---

## 🆘 Troubleshooting

**Frontend build error?**
- Pastikan root directory = `frontend`
- Cek build logs di Vercel

**Backend tidak bisa start?**
- Pastikan `PORT` menggunakan `process.env.PORT`
- Cek logs di Railway/Render

**CORS error?**
- Pastikan `CORS_ORIGIN` include frontend URL
- Format: `https://your-app.vercel.app`

---

**Selamat deploy! 🎉**

