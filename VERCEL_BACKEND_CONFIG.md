# ✅ Konfigurasi Backend di Vercel - YANG BENAR

## 📋 Settings yang Harus Diisi:

### ✅ Yang Sudah Benar:
- **Repository:** WuliddahTamsil/MycoTrack_V2 ✓
- **Branch:** main ✓
- **Root Directory:** backend ✓
- **Framework Preset:** Express ✓

### ❌ Yang Perlu Diperbaiki:

#### 1. Build Command
**SALAH:** `cd frontend && npm install && npm run build`  
**BENAR:** `npm install`  
**ATAU:** (kosongkan saja - Vercel akan otomatis install)

#### 2. Output Directory
**SALAH:** `frontend/build`  
**BENAR:** (kosongkan - backend tidak punya build output)

#### 3. Install Command
**SALAH:** `cd frontend && npm install`  
**BENAR:** `npm install`  
**ATAU:** (kosongkan - Vercel akan otomatis install)

## 🎯 Konfigurasi Lengkap yang BENAR:

```
Project Name: myco-track-v2-backend          ✓
Framework Preset: Express                     ✓
Root Directory: backend                       ✓
Build Command: npm install                    ← PERBAIKI
Output Directory: (kosongkan)                 ← PERBAIKI
Install Command: npm install                  ← PERBAIKI
```

**ATAU lebih sederhana (Recommended):**

```
Project Name: myco-track-v2-backend
Framework Preset: Express
Root Directory: backend
Build Command: (kosongkan)
Output Directory: (kosongkan)
Install Command: (kosongkan)
```

Vercel akan otomatis detect `package.json` dan install dependencies!

## ⚙️ Environment Variables (Tambahkan Setelah Deploy):

Setelah project berhasil deploy, tambahkan environment variables:

1. Buka project > **Settings** > **Environment Variables**
2. Klik **Add New**
3. Tambahkan:

   **Variable 1:**
   ```
   Key: CORS_ORIGIN
   Value: https://your-frontend.vercel.app
   ```
   (Ganti dengan URL frontend Vercel Anda)

   **Variable 2:**
   ```
   Key: ML_SERVICE_URL
   Value: https://your-ml-service.railway.app
   ```
   (Tambahkan setelah ML service di-deploy)

   **Variable 3 (Optional):**
   ```
   Key: PORT
   Value: 3000
   ```

## ✅ Setelah Deploy:

1. **Copy URL deployment** (contoh: `https://myco-track-v2-backend.vercel.app`)
2. **Test health check:**
   ```
   https://your-backend-url.vercel.app/api/health
   ```
   Harus return: `{"status":"ok","message":"Backend is running"}`
3. **Update frontend environment variable:**
   - Buka Vercel Dashboard > Frontend project
   - Settings > Environment Variables
   - Update `VITE_API_BASE_URL` dengan URL backend yang baru

## 🎯 Quick Summary:

**Yang penting:**
- ✅ Root Directory: `backend`
- ✅ Build Command: `npm install` atau kosongkan
- ✅ Output Directory: **KOSONGKAN**
- ✅ Install Command: `npm install` atau kosongkan

**Yang TIDAK perlu:**
- ❌ Jangan isi dengan `cd frontend`
- ❌ Jangan isi dengan `frontend/build`
- ❌ Backend tidak perlu build output

---

**Setelah deploy, jangan lupa tambahkan environment variables!**

