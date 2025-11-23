# Deployment Guide - MycoTrack V2

Panduan lengkap untuk deploy aplikasi MycoTrack ke Vercel dan platform lainnya.

## Struktur Deployment

### 1. Frontend (Vercel) ✅
- **Platform**: Vercel
- **Framework**: Vite + React
- **Status**: Siap deploy

### 2. Backend (Railway/Render) ⚠️
- **Platform**: Railway atau Render (recommended)
- **Runtime**: Node.js
- **Status**: Perlu konfigurasi

### 3. Machine Learning Service (Railway/Render) ⚠️
- **Platform**: Railway atau Render
- **Runtime**: Python
- **Status**: Perlu konfigurasi

---

## 🚀 Deployment Frontend ke Vercel

### Opsi 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login ke Vercel**:
```bash
vercel login
```

3. **Deploy dari root project**:
```bash
cd "D:\RPL_Kelompok 4 - NOVA"
vercel
```

4. **Follow prompts**:
   - Set project name: `mycotrack-frontend`
   - Set root directory: `frontend`
   - Set build command: `npm run build`
   - Set output directory: `build`

### Opsi 2: Deploy via GitHub Integration

1. **Push code ke GitHub** (sudah dilakukan)
2. **Login ke Vercel Dashboard**: https://vercel.com
3. **Import Project**:
   - Pilih repository: `WuliddahTamsil/MycoTrack_V2`
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Add Environment Variables** (jika ada)
5. **Deploy**

### Konfigurasi Vercel

File `vercel.json` sudah dibuat di root project dengan konfigurasi:
- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/build`
- Framework: Vite

---

## 🔧 Deployment Backend ke Railway/Render

### Railway (Recommended)

1. **Install Railway CLI**:
```bash
npm i -g @railway/cli
```

2. **Login**:
```bash
railway login
```

3. **Initialize project**:
```bash
cd backend
railway init
```

4. **Deploy**:
```bash
railway up
```

5. **Set Environment Variables** di Railway Dashboard:
   - `NODE_ENV=production`
   - `PORT=3000` (atau port yang disediakan Railway)
   - `ML_SERVICE_URL=<url-ml-service>`

### Render

1. **Login ke Render**: https://render.com
2. **Create New Web Service**
3. **Connect GitHub repository**
4. **Configure**:
   - **Name**: `mycotrack-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free atau Starter

---

## 🤖 Deployment ML Service ke Railway/Render

### Railway

1. **Create new service** di Railway
2. **Select repository** dan set root directory: `machine learning/Project`
3. **Configure**:
   - **Start Command**: `python ml_api_service.py`
   - **Environment**: Python 3.10+
4. **Install dependencies**:
   - Railway akan otomatis install dari `requirements_ml_api.txt`
5. **Set Environment Variables**:
   - `FLASK_ENV=production`
   - `PORT=5000`

### Render

1. **Create new Web Service**
2. **Configure**:
   - **Root Directory**: `machine learning/Project`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements_ml_api.txt`
   - **Start Command**: `python ml_api_service.py`
   - **Plan**: Free (dengan limit) atau Starter

---

## 🔗 Update API URLs

Setelah semua service ter-deploy, update URL di frontend:

### 1. Update Backend URL

Edit file `frontend/src/components/**/*.tsx` dan ganti:
```typescript
// Dari
const API_URL = 'http://localhost:3000';

// Ke
const API_URL = 'https://your-backend-url.railway.app';
// atau
const API_URL = 'https://your-backend-url.onrender.com';
```

### 2. Update ML Service URL

Edit `backend/server.js`:
```javascript
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'https://your-ml-service.railway.app';
```

Atau set environment variable di Railway/Render:
```
ML_SERVICE_URL=https://your-ml-service.railway.app
```

---

## 📝 Environment Variables

### Frontend (Vercel)
- `VITE_API_URL` - Backend API URL
- `VITE_ML_SERVICE_URL` - ML Service URL (optional)

### Backend (Railway/Render)
- `NODE_ENV=production`
- `PORT=3000` (atau port yang disediakan)
- `ML_SERVICE_URL` - URL ML service
- `CORS_ORIGIN` - Frontend URL dari Vercel

### ML Service (Railway/Render)
- `FLASK_ENV=production`
- `PORT=5000` (atau port yang disediakan)

---

## 🎯 Quick Start Commands

### Deploy Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Deploy Backend (Railway)
```bash
cd backend
railway up
```

### Deploy ML Service (Railway)
```bash
cd "machine learning/Project"
railway up
```

---

## ⚠️ Catatan Penting

1. **File Storage**: 
   - Vercel/Railway/Render menggunakan ephemeral storage
   - File uploads akan hilang setelah restart
   - Gunakan cloud storage (AWS S3, Cloudinary) untuk production

2. **Database**:
   - JSON files tidak ideal untuk production
   - Pertimbangkan menggunakan database (PostgreSQL, MongoDB) di Railway/Render

3. **ML Model Files**:
   - File `.pt` (PyTorch models) besar
   - Gunakan cloud storage atau CDN untuk model files

4. **CORS**:
   - Pastikan backend mengizinkan origin dari Vercel frontend URL

---

## 🔍 Troubleshooting

### Frontend tidak bisa connect ke backend
- Cek CORS settings di backend
- Pastikan backend URL benar
- Cek environment variables

### ML Service tidak bisa diakses
- Pastikan ML service sudah running
- Cek URL di environment variables
- Pastikan port dan endpoint benar

### Build error di Vercel
- Cek `package.json` scripts
- Pastikan semua dependencies terinstall
- Cek build logs di Vercel dashboard

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

