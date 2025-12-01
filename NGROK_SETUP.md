# 🔗 Setup Ngrok untuk Testing (Temporary Solution)

## ⚠️ Catatan Penting

**Ngrok BUKAN solusi untuk production deployment!**  
Ngrok cocok untuk:
- ✅ Testing sementara
- ✅ Development
- ✅ Demo cepat
- ❌ **TIDAK untuk production** (URL berubah, session timeout)

## 🚀 Setup Ngrok

### 1. Install Ngrok

**Windows:**
1. Download dari: https://ngrok.com/download
2. Extract ke folder (contoh: `C:\ngrok`)
3. Atau install via chocolatey: `choco install ngrok`

**Atau via npm:**
```bash
npm install -g ngrok
```

### 2. Daftar Akun Ngrok (Gratis)

1. Buka: https://dashboard.ngrok.com/signup
2. Daftar dengan email/GitHub
3. Copy **Authtoken** dari dashboard

### 3. Setup Ngrok

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 4. Jalankan Backend Lokal

```bash
cd backend
npm start
```

Backend akan berjalan di `http://localhost:3000`

### 5. Expose dengan Ngrok

**Buka terminal baru:**
```bash
ngrok http 3000
```

Anda akan dapat URL seperti:
```
Forwarding: https://abc123.ngrok-free.app -> http://localhost:3000
```

### 6. Expose ML Service

**Buka terminal baru lagi:**
```bash
cd "machine learning/Project"
python ml_api_service.py
```

**Buka terminal baru:**
```bash
ngrok http 5000
```

Anda akan dapat URL seperti:
```
Forwarding: https://xyz789.ngrok-free.app -> http://localhost:5000
```

## 🔧 Konfigurasi Frontend

### Update Environment Variables di Vercel:

1. Buka Vercel Dashboard > Frontend project
2. Settings > Environment Variables
3. Update:
   ```
   VITE_API_BASE_URL=https://abc123.ngrok-free.app
   VITE_ML_API_BASE_URL=https://xyz789.ngrok-free.app/api/ml
   ```
4. Redeploy frontend

## ⚠️ Limitasi Ngrok Free Tier

1. **URL berubah setiap restart** (kecuali pakai paid plan)
2. **Session timeout** setelah beberapa jam
3. **Request limit** per bulan
4. **Harus keep terminal ngrok terbuka**

## 🎯 Alternatif: Pakai Platform Gratis

**Lebih baik pakai platform gratis yang sudah saya sebutkan:**
- Vercel (backend) - 100% gratis
- Render (ML service) - free tier
- Railway - $5 credit gratis

Lihat `DEPLOYMENT_FREE_TIERS.md` untuk detail.

## 📝 Script Helper untuk Ngrok

Buat file `start-with-ngrok.bat`:

```batch
@echo off
echo Starting Backend with Ngrok...

REM Start backend
start "Backend" cmd /k "cd backend && npm start"

REM Wait 5 seconds
timeout /t 5

REM Start ngrok for backend
start "Ngrok Backend" cmd /k "ngrok http 3000"

echo.
echo Backend: http://localhost:3000
echo Ngrok URL akan muncul di window "Ngrok Backend"
echo.
pause
```

---

**Rekomendasi:** Pakai platform gratis (Vercel + Render) untuk production yang stabil!

