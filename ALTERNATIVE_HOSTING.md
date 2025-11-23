# 🌐 Alternatif Platform Hosting Gratis - MycoTrack V2

Daftar lengkap platform hosting gratis untuk Backend (Node.js) dan ML Service (Python).

---

## 🥇 Rekomendasi Terbaik (Gratis)

### 1. **Render** ⭐⭐⭐⭐⭐
**URL**: https://render.com

#### ✅ Kelebihan:
- **Gratis** dengan limit yang cukup
- Support **Node.js** dan **Python**
- Auto-deploy dari GitHub
- SSL certificate gratis
- Custom domain gratis
- Persistent disk storage (untuk file uploads)
- Environment variables mudah di-set

#### ⚠️ Limit Gratis:
- **Sleep setelah 15 menit tidak aktif** (wake up dalam 30 detik)
- 750 jam/bulan (cukup untuk development/testing)
- 100GB bandwidth/bulan
- 512MB RAM

#### 💰 Upgrade:
- Starter: $7/bulan (no sleep, lebih banyak resources)

#### 📝 Cara Deploy:

**Backend (Node.js):**
1. Login → **New** → **Web Service**
2. Connect GitHub → Pilih repository
3. **Name**: `mycotrack-backend`
4. **Root Directory**: `backend`
5. **Environment**: `Node`
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`
8. **Plan**: Free
9. **Environment Variables**:
   - `NODE_ENV=production`
   - `PORT` (auto-set oleh Render)
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
   - `ML_SERVICE_URL=https://your-ml-service.onrender.com`

**ML Service (Python):**
1. **New** → **Web Service**
2. **Root Directory**: `machine learning/Project`
3. **Environment**: `Python 3`
4. **Build Command**: `pip install -r requirements_ml_api.txt`
5. **Start Command**: `python ml_api_service.py`
6. **Plan**: Free

---

### 2. **Fly.io** ⭐⭐⭐⭐
**URL**: https://fly.io

#### ✅ Kelebihan:
- **Gratis** dengan $5 credit/bulan
- **No sleep** (selalu online)
- Support Node.js dan Python
- Global edge network (cepat)
- Auto-scaling
- Persistent volumes untuk storage

#### ⚠️ Limit Gratis:
- $5 credit/bulan (cukup untuk 1-2 small apps)
- 3 shared-cpu VMs
- 3GB persistent volumes

#### 📝 Cara Deploy:

**Install Fly CLI:**
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

**Backend:**
```bash
cd backend
fly launch
# Follow prompts
fly deploy
```

**ML Service:**
```bash
cd "machine learning/Project"
fly launch
fly deploy
```

---

### 3. **Cyclic.sh** ⭐⭐⭐⭐
**URL**: https://cyclic.sh

#### ✅ Kelebihan:
- **Gratis** untuk Node.js
- **No sleep** (selalu online)
- Auto-deploy dari GitHub
- Serverless (auto-scaling)
- Built-in database (DynamoDB)
- SSL gratis

#### ⚠️ Limit Gratis:
- Hanya untuk **Node.js** (tidak support Python ML service)
- 1 project gratis
- 100GB bandwidth/bulan

#### 📝 Cara Deploy:
1. Login dengan GitHub
2. **New App** → Pilih repository
3. **Root Directory**: `backend`
4. Auto-deploy!

**Note**: Tidak cocok untuk ML service (Python), tapi bagus untuk backend.

---

### 4. **Koyeb** ⭐⭐⭐⭐
**URL**: https://www.koyeb.com

#### ✅ Kelebihan:
- **Gratis** dengan limit
- Support Node.js dan Python
- Auto-deploy dari GitHub
- Global edge network
- No sleep (selalu online)
- Persistent storage

#### ⚠️ Limit Gratis:
- 2 services gratis
- 512MB RAM per service
- 10GB storage
- 50GB bandwidth/bulan

#### 📝 Cara Deploy:
1. Login → **Create App**
2. **GitHub** → Pilih repository
3. **Root Directory**: `backend` atau `machine learning/Project`
4. **Runtime**: Node.js atau Python
5. Deploy!

---

### 5. **Replit** ⭐⭐⭐
**URL**: https://replit.com

#### ✅ Kelebihan:
- **Gratis** dengan limit
- Support Node.js dan Python
- Online IDE terintegrasi
- Auto-deploy
- Custom domain gratis

#### ⚠️ Limit Gratis:
- **Sleep setelah 5 menit tidak aktif**
- 500MB storage
- 1GB RAM
- Limited CPU

#### 📝 Cara Deploy:
1. Login → **Create Repl**
2. **Import from GitHub**
3. Pilih repository
4. Set **Root Directory**
5. Run!

**Note**: Cocok untuk development/testing, kurang ideal untuk production.

---

### 6. **Glitch** ⭐⭐⭐
**URL**: https://glitch.com

#### ✅ Kelebihan:
- **Gratis**
- Support Node.js
- Online editor
- Auto-reload saat edit
- Community friendly

#### ⚠️ Limit Gratis:
- **Sleep setelah 5 menit tidak aktif**
- 512MB RAM
- Limited storage

#### 📝 Cara Deploy:
1. Login → **New Project** → **Import from GitHub**
2. Pilih repository
3. Set **Root Directory**: `backend`
4. Deploy!

**Note**: Tidak support Python ML service dengan baik.

---

### 7. **PythonAnywhere** ⭐⭐⭐⭐
**URL**: https://www.pythonanywhere.com

#### ✅ Kelebihan:
- **Gratis** untuk Python
- Khusus untuk Python apps
- Persistent storage
- Scheduled tasks
- MySQL database gratis

#### ⚠️ Limit Gratis:
- **Hanya 1 web app**
- **Sleep setelah 3 bulan tidak aktif**
- 512MB storage
- 1GB bandwidth/bulan

#### 📝 Cara Deploy ML Service:
1. Login → **Web** → **Add a new web app**
2. **Manual configuration** → **Python 3.10**
3. Upload files atau clone from GitHub
4. Set **Source code**: `machine learning/Project`
5. Set **WSGI file**: `ml_api_service.wsgi`
6. Reload!

**Note**: Cocok untuk ML service (Python), tidak cocok untuk Node.js backend.

---

### 8. **Netlify Functions** ⭐⭐⭐
**URL**: https://www.netlify.com

#### ✅ Kelebihan:
- **Gratis** untuk serverless functions
- Auto-deploy dari GitHub
- CDN global
- SSL gratis

#### ⚠️ Limit Gratis:
- 125,000 requests/bulan
- 100GB bandwidth/bulan
- 6.25 hours execution time/bulan

#### 📝 Cara Deploy:
1. Login → **New site from Git**
2. Pilih repository
3. **Build settings**:
   - Build command: `npm run build` (untuk frontend)
   - Functions directory: `backend/api` (untuk serverless functions)

**Note**: Perlu refactor backend ke serverless functions.

---

### 9. **Vercel Serverless Functions** ⭐⭐⭐
**URL**: https://vercel.com

#### ✅ Kelebihan:
- **Gratis** untuk serverless
- Auto-deploy dari GitHub
- Global CDN
- SSL gratis

#### ⚠️ Limit Gratis:
- 100GB bandwidth/bulan
- 100 hours execution time/bulan
- 10 seconds max execution per function

#### 📝 Cara Deploy:
- Sudah ada konfigurasi di `vercel.json`
- Perlu refactor backend ke serverless functions di folder `api/`

**Note**: Perlu refactor Express app ke serverless functions.

---

## 📊 Perbandingan Platform

| Platform | Backend (Node.js) | ML Service (Python) | Sleep? | Storage | Rating |
|----------|------------------|---------------------|--------|---------|--------|
| **Render** | ✅ | ✅ | ⚠️ 15 min | ✅ | ⭐⭐⭐⭐⭐ |
| **Fly.io** | ✅ | ✅ | ❌ No | ✅ | ⭐⭐⭐⭐ |
| **Cyclic** | ✅ | ❌ | ❌ No | ✅ | ⭐⭐⭐⭐ |
| **Koyeb** | ✅ | ✅ | ❌ No | ✅ | ⭐⭐⭐⭐ |
| **Replit** | ✅ | ✅ | ⚠️ 5 min | ⚠️ | ⭐⭐⭐ |
| **Glitch** | ✅ | ❌ | ⚠️ 5 min | ⚠️ | ⭐⭐⭐ |
| **PythonAnywhere** | ❌ | ✅ | ⚠️ 3 bulan | ✅ | ⭐⭐⭐⭐ |
| **Netlify** | ⚠️ Functions | ❌ | ❌ No | ⚠️ | ⭐⭐⭐ |
| **Vercel** | ⚠️ Functions | ❌ | ❌ No | ⚠️ | ⭐⭐⭐ |

---

## 🎯 Rekomendasi untuk MycoTrack V2

### Opsi 1: **Render** (Paling Mudah) ⭐
- ✅ Backend → Render (Node.js)
- ✅ ML Service → Render (Python)
- ✅ Sama-sama di Render, mudah manage
- ⚠️ Sleep setelah 15 menit (wake up cepat)

### Opsi 2: **Fly.io** (No Sleep) ⭐
- ✅ Backend → Fly.io (Node.js)
- ✅ ML Service → Fly.io (Python)
- ✅ Selalu online, tidak sleep
- ⚠️ Perlu setup via CLI

### Opsi 3: **Koyeb** (Balanced) ⭐
- ✅ Backend → Koyeb (Node.js)
- ✅ ML Service → Koyeb (Python)
- ✅ No sleep, mudah setup
- ⚠️ Limit lebih kecil

### Opsi 4: **Kombinasi** (Optimal)
- ✅ Backend → **Cyclic** (Node.js, no sleep)
- ✅ ML Service → **PythonAnywhere** (Python, khusus Python)
- ✅ Keduanya no sleep
- ⚠️ Manage di 2 platform berbeda

---

## 📝 Setup Guide untuk Render (Recommended)

### Backend di Render:

1. **Login**: https://render.com
2. **New** → **Web Service**
3. **Connect GitHub** → Pilih `WuliddahTamsil/MycoTrack_V2`
4. **Configure**:
   - **Name**: `mycotrack-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. **Environment Variables**:
   ```
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend.vercel.app
   ML_SERVICE_URL=https://your-ml-service.onrender.com
   ```
6. **Advanced** → **Add Disk** (untuk uploads, optional)
7. **Create Web Service**

### ML Service di Render:

1. Di dashboard yang sama, **New** → **Web Service**
2. **Connect GitHub** → Repository yang sama
3. **Configure**:
   - **Name**: `mycotrack-ml-service`
   - **Root Directory**: `machine learning/Project`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements_ml_api.txt`
   - **Start Command**: `python ml_api_service.py`
   - **Plan**: Free
4. **Environment Variables**:
   ```
   FLASK_ENV=production
   PORT=5000
   ```
5. **Create Web Service**

---

## 🔧 Setup Guide untuk Fly.io

### Install Fly CLI:
```bash
# Windows PowerShell
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

### Backend:
```bash
cd backend
fly launch
# Pilih region, app name, dll
fly deploy
```

### ML Service:
```bash
cd "machine learning/Project"
fly launch
fly deploy
```

---

## ⚠️ Catatan Penting

1. **Sleep Mode**: 
   - Render: Sleep setelah 15 menit, wake up dalam 30 detik
   - Replit/Glitch: Sleep setelah 5 menit
   - Fly.io/Koyeb/Cyclic: **No sleep** (selalu online)

2. **Storage**:
   - File uploads akan hilang setelah restart (ephemeral)
   - Gunakan cloud storage (AWS S3, Cloudinary) untuk production

3. **Database**:
   - JSON files tidak ideal untuk production
   - Gunakan database cloud (MongoDB Atlas, Supabase, PlanetScale)

4. **ML Models**:
   - File `.pt` besar, gunakan cloud storage atau CDN

---

## 🆘 Troubleshooting

### Render: App Sleep
- Request pertama akan lambat (30 detik untuk wake up)
- Solusi: Upgrade ke Starter plan ($7/bulan) atau gunakan Fly.io

### Fly.io: Out of Credit
- Cek usage di dashboard
- Optimize resources atau upgrade

### PythonAnywhere: App Sleep
- Login dan reload app setiap 3 bulan
- Atau upgrade ke paid plan

---

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Fly.io Documentation](https://fly.io/docs)
- [Cyclic Documentation](https://docs.cyclic.sh)
- [Koyeb Documentation](https://www.koyeb.com/docs)
- [PythonAnywhere Documentation](https://help.pythonanywhere.com)

---

**Pilih platform yang sesuai kebutuhan! 🚀**

