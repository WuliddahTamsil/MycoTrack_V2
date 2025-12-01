# ✅ Konfigurasi Backend di Render - YANG BENAR

## 📋 Settings yang Harus Diisi:

### ✅ Yang Sudah Benar:
- **Root Directory:** `backend` ✓
- **Language:** Node ✓

### ❌ Yang Perlu Diperbaiki:

#### 1. Build Command
**SALAH:** `backend/ $ yarn`  
**BENAR:** `npm install`

**Atau bisa dikosongkan** (Render akan otomatis install dependencies)

#### 2. Start Command  
**SALAH:** `backend/ $ yarn start`  
**BENAR:** `npm start`

**Atau bisa pakai:** `node server.js`

## 🎯 Konfigurasi Lengkap:

```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

**ATAU lebih sederhana:**

```
Root Directory: backend
Build Command: (kosongkan)
Start Command: npm start
```

## ⚙️ Environment Variables (Tambahkan Setelah Deploy):

Setelah service berhasil deploy, tambahkan environment variables:

1. Buka service > **Environment** tab
2. Tambahkan:
   ```
   CORS_ORIGIN=https://your-frontend.vercel.app
   ML_SERVICE_URL=https://your-ml-service.railway.app
   PORT=3000
   ```

## ✅ Setelah Deploy:

1. Copy URL service (contoh: `https://mycotrack-backend.onrender.com`)
2. Test health check: `https://your-backend-url.onrender.com/api/health`
3. Update frontend environment variable dengan URL ini

