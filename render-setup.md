# 🚀 Setup Render - Step by Step

Panduan lengkap deploy Backend dan ML Service ke Render (gratis).

---

## 📋 Prerequisites

1. **GitHub Repository**: `WuliddahTamsil/MycoTrack_V2` (sudah ada)
2. **Render Account**: https://render.com (gratis, sign up dengan GitHub)

---

## 1️⃣ Deploy Backend ke Render

### Step 1: Login ke Render
1. Buka https://render.com
2. Klik **"Get Started for Free"**
3. **Sign up dengan GitHub** (paling mudah)

### Step 2: Create Web Service
1. Setelah login, klik **"New +"** di dashboard
2. Pilih **"Web Service"**

### Step 3: Connect Repository
1. **Connect account** → Pilih GitHub
2. Authorize Render untuk akses repository
3. Pilih repository: **`WuliddahTamsil/MycoTrack_V2`**

### Step 4: Configure Backend
Isi form dengan:

- **Name**: `mycotrack-backend`
- **Region**: Pilih yang terdekat (Singapore recommended)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **PENTING!**
- **Runtime**: `Node` (auto-detect)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free** (atau Starter $7/bulan untuk no sleep)

### Step 5: Environment Variables
Klik **"Advanced"** → **"Add Environment Variable"**:

```
NODE_ENV = production
CORS_ORIGIN = https://your-frontend.vercel.app
ML_SERVICE_URL = https://your-ml-service.onrender.com
```

**Note**: 
- `CORS_ORIGIN`: Isi setelah frontend ter-deploy di Vercel
- `ML_SERVICE_URL`: Isi setelah ML service ter-deploy

### Step 6: Deploy
1. Klik **"Create Web Service"**
2. Render akan mulai build dan deploy
3. Tunggu 3-5 menit
4. **URL akan muncul**: `https://mycotrack-backend.onrender.com`

✅ **Backend selesai!**

---

## 2️⃣ Deploy ML Service ke Render

### Step 1: Create New Web Service
1. Di dashboard Render, klik **"New +"** lagi
2. Pilih **"Web Service"**

### Step 2: Connect Repository
1. Pilih repository yang sama: **`WuliddahTamsil/MycoTrack_V2`**

### Step 3: Configure ML Service
Isi form dengan:

- **Name**: `mycotrack-ml-service`
- **Region**: Sama dengan backend (Singapore)
- **Branch**: `main`
- **Root Directory**: `machine learning/Project` ⚠️ **PENTING!**
- **Runtime**: `Python 3` (auto-detect)
- **Build Command**: `pip install -r requirements_ml_api.txt`
- **Start Command**: `python ml_api_service.py`
- **Plan**: **Free**

### Step 4: Environment Variables
```
FLASK_ENV = production
PORT = 5000
```

**Note**: Render akan set `PORT` otomatis, tapi set manual juga tidak masalah.

### Step 5: Deploy
1. Klik **"Create Web Service"**
2. Tunggu build (bisa 5-10 menit untuk install dependencies Python)
3. **URL akan muncul**: `https://mycotrack-ml-service.onrender.com`

✅ **ML Service selesai!**

---

## 3️⃣ Update Environment Variables

### Update Backend:
1. Buka Backend service di Render dashboard
2. **Environment** tab
3. **Update**:
   - `CORS_ORIGIN` = `https://your-frontend.vercel.app`
   - `ML_SERVICE_URL` = `https://mycotrack-ml-service.onrender.com`
4. **Save Changes** → Render akan auto-redeploy

### Update Frontend (Vercel):
1. Buka Vercel dashboard → Frontend project
2. **Settings** → **Environment Variables**
3. **Add**:
   - `VITE_API_URL` = `https://mycotrack-backend.onrender.com`
4. **Redeploy** (atau tunggu auto-redeploy)

---

## 4️⃣ Test Deployment

### Test Backend:
```bash
curl https://mycotrack-backend.onrender.com/api/health
```

Harus return: `{"status":"ok",...}`

### Test ML Service:
```bash
curl https://mycotrack-ml-service.onrender.com/health
```

Harus return: `{"status":"ok",...}`

### Test dari Frontend:
1. Buka frontend URL di Vercel
2. Coba login/register
3. Cek browser console untuk error

---

## ⚠️ Catatan Penting

### Sleep Mode (Free Plan):
- Render akan **sleep setelah 15 menit tidak aktif**
- Request pertama akan **lambat** (30 detik untuk wake up)
- Request berikutnya normal
- **Solusi**: Upgrade ke Starter ($7/bulan) untuk no sleep

### Persistent Storage:
- File uploads di `/uploads` akan **hilang setelah restart**
- Untuk production, gunakan cloud storage:
  - AWS S3
  - Cloudinary
  - Supabase Storage

### Database:
- JSON files di `/data` akan **hilang setelah restart**
- Untuk production, gunakan database:
  - MongoDB Atlas (gratis)
  - Supabase (gratis)
  - PlanetScale (gratis)

---

## 🔍 Monitoring

### View Logs:
1. Buka service di Render dashboard
2. **Logs** tab
3. Real-time logs akan muncul

### Check Status:
- **Dashboard** → Lihat status semua services
- Green = Running
- Yellow = Building/Deploying
- Red = Error

---

## 🐛 Troubleshooting

### Build Failed:
- Cek **Logs** tab
- Pastikan **Root Directory** benar
- Pastikan **Build Command** benar
- Pastikan `package.json` atau `requirements.txt` ada

### App Crashed:
- Cek **Logs** tab untuk error
- Pastikan **Start Command** benar
- Pastikan environment variables sudah di-set
- Pastikan port menggunakan `process.env.PORT`

### CORS Error:
- Pastikan `CORS_ORIGIN` di backend include frontend URL
- Format: `https://your-app.vercel.app` (tanpa trailing slash)

### ML Service Timeout:
- ML service butuh waktu lebih lama untuk start
- Pastikan semua dependencies terinstall
- Cek logs untuk error

---

## 📊 Cost Estimate

### Free Plan:
- ✅ **Gratis** selamanya
- ⚠️ Sleep setelah 15 menit
- ✅ 750 jam/bulan (cukup untuk development)

### Starter Plan ($7/bulan):
- ✅ **No sleep** (selalu online)
- ✅ 750 jam/bulan
- ✅ 100GB bandwidth/bulan
- ✅ Priority support

**Rekomendasi**: Mulai dengan Free, upgrade jika perlu no sleep.

---

## ✅ Checklist

- [ ] Backend ter-deploy di Render
- [ ] ML Service ter-deploy di Render
- [ ] Environment variables sudah di-set
- [ ] CORS origin sudah di-update
- [ ] Frontend bisa connect ke backend
- [ ] Backend bisa connect ke ML service
- [ ] Test semua endpoints
- [ ] Monitor logs untuk error

---

**Selamat deploy! 🎉**

