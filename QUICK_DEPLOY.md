# 🚀 Quick Deploy Guide - MycoTrack V2

Panduan cepat untuk deploy semua komponen aplikasi.

## 📋 Prerequisites

1. **Vercel Account**: https://vercel.com (gratis)
2. **Railway Account**: https://railway.app (gratis dengan $5 credit)
   - Atau **Render Account**: https://render.com (gratis dengan limit)

---

## 🎯 Step-by-Step Deployment

### 1️⃣ Deploy Frontend ke Vercel (5 menit)

#### Via Vercel Dashboard (Paling Mudah):

1. **Login ke Vercel**: https://vercel.com
2. **Klik "Add New Project"**
3. **Import Git Repository**:
   - Pilih: `WuliddahTamsil/MycoTrack_V2`
4. **Configure Project**:
   - **Project Name**: `mycotrack-frontend`
   - **Root Directory**: `frontend` ⚠️ **PENTING!**
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (otomatis terdeteksi)
   - **Output Directory**: `build` (otomatis terdeteksi)
5. **Environment Variables** (opsional untuk sekarang):
   - `VITE_API_URL` = (akan diisi setelah backend deploy)
6. **Klik Deploy**

✅ Frontend akan ter-deploy dalam 2-3 menit!

#### Via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod
```

---

### 2️⃣ Deploy Backend ke Railway (10 menit)

#### Via Railway Dashboard:

1. **Login ke Railway**: https://railway.app
2. **Klik "New Project"**
3. **Pilih "Deploy from GitHub repo"**
4. **Pilih repository**: `WuliddahTamsil/MycoTrack_V2`
5. **Configure Service**:
   - **Name**: `mycotrack-backend`
   - **Root Directory**: `backend` ⚠️ **PENTING!**
   - **Start Command**: `npm start`
6. **Set Environment Variables**:
   - `NODE_ENV` = `production`
   - `ML_SERVICE_URL` = (akan diisi setelah ML service deploy)
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app`
7. **Deploy**

✅ Backend akan ter-deploy dan dapat URL seperti: `https://mycotrack-backend.railway.app`

#### Via Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

---

### 3️⃣ Deploy ML Service ke Railway (10 menit)

#### Via Railway Dashboard:

1. **Di project yang sama, klik "New Service"**
2. **Pilih "Deploy from GitHub repo"**
3. **Pilih repository**: `WuliddahTamsil/MycoTrack_V2`
4. **Configure Service**:
   - **Name**: `mycotrack-ml-service`
   - **Root Directory**: `machine learning/Project` ⚠️ **PENTING!**
   - **Start Command**: `python ml_api_service.py`
5. **Set Environment Variables**:
   - `FLASK_ENV` = `production`
   - `PORT` = `5000` (Railway akan set otomatis)
6. **Deploy**

✅ ML Service akan ter-deploy dan dapat URL seperti: `https://mycotrack-ml-service.railway.app`

---

### 4️⃣ Update URLs & Environment Variables

#### Update Backend CORS:

1. **Buka Railway Dashboard** → Backend Service
2. **Settings** → **Environment Variables**
3. **Update**:
   - `CORS_ORIGIN` = `https://your-frontend.vercel.app`
   - `ML_SERVICE_URL` = `https://your-ml-service.railway.app`

#### Update Frontend API URL:

1. **Buka Vercel Dashboard** → Frontend Project
2. **Settings** → **Environment Variables**
3. **Add**:
   - `VITE_API_URL` = `https://your-backend.railway.app`
   - `VITE_ML_SERVICE_URL` = `https://your-ml-service.railway.app` (optional)

4. **Redeploy Frontend** (Vercel akan auto-redeploy jika ada perubahan)

#### Update Frontend Code (jika hardcoded):

Jika ada hardcoded `localhost:3000` di frontend, update ke:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app';
```

---

## 🔄 Alternative: Deploy ke Render

Jika Railway tidak tersedia, gunakan Render:

### Backend di Render:

1. **Login**: https://render.com
2. **New** → **Web Service**
3. **Connect GitHub** → Pilih repository
4. **Configure**:
   - **Name**: `mycotrack-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### ML Service di Render:

1. **New** → **Web Service**
2. **Configure**:
   - **Name**: `mycotrack-ml-service`
   - **Root Directory**: `machine learning/Project`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements_ml_api.txt`
   - **Start Command**: `python ml_api_service.py`
   - **Plan**: Free

---

## ✅ Checklist Deployment

- [ ] Frontend ter-deploy di Vercel
- [ ] Backend ter-deploy di Railway/Render
- [ ] ML Service ter-deploy di Railway/Render
- [ ] Environment variables sudah di-set
- [ ] CORS origin sudah di-update
- [ ] Frontend bisa connect ke backend
- [ ] Backend bisa connect ke ML service

---

## 🐛 Troubleshooting

### Frontend: Build Error
- Pastikan root directory = `frontend`
- Cek `package.json` di folder frontend
- Lihat build logs di Vercel dashboard

### Backend: Port Error
- Railway/Render akan set PORT otomatis
- Update `server.js` untuk menggunakan `process.env.PORT`

### ML Service: Module Not Found
- Pastikan `requirements_ml_api.txt` lengkap
- Cek build logs untuk missing dependencies

### CORS Error
- Pastikan `CORS_ORIGIN` di backend include frontend URL
- Format: `https://your-app.vercel.app` (tanpa trailing slash)

---

## 📞 Support

Jika ada masalah, cek:
1. Build logs di masing-masing platform
2. Environment variables sudah benar
3. Root directory sudah benar
4. Start command sudah benar

---

**Selamat deploy! 🎉**

