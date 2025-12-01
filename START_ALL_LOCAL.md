# 🚀 Cara Menjalankan Semua Service Lokal

## ✅ Kondisi Awal (Localhost)

Semua akan kembali ke localhost jika:
1. Environment variables TIDAK di-set
2. Semua service berjalan lokal

## 📋 Langkah-langkah:

### 1. Pastikan Environment Variables TIDAK Di-Set

**Di Vercel (jika ada):**
- Settings > Environment Variables
- Hapus atau rename `VITE_API_BASE_URL` jika ada
- Atau biarkan kosong (akan otomatis pakai localhost)

### 2. Jalankan Backend

**Terminal 1:**
```bash
cd backend
npm start
```

Backend akan berjalan di: `http://localhost:3000`

**Verifikasi:**
Buka: `http://localhost:3000/api/health`
Harus return: `{"status":"ok","message":"Backend is running"}`

### 3. Jalankan ML Service

**Terminal 2:**
```bash
cd "machine learning/Project"
python ml_api_service.py
```

ML service akan berjalan di: `http://localhost:5000`

**Verifikasi:**
Buka: `http://localhost:5000/health`
Harus return JSON dengan status healthy

### 4. Jalankan Frontend

**Terminal 3:**
```bash
cd frontend
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

**Verifikasi:**
1. Buka: `http://localhost:5173`
2. Buka DevTools (F12) > Console
3. Cari: `API Configuration:`
4. Pastikan:
   ```
   API_BASE_URL: "http://localhost:3000/api"
   ```

## 🎯 Quick Start (Windows)

**Gunakan script:**
1. Double-click: `START_LOCAL.bat`
2. Script akan start backend dan frontend
3. ML service jalankan manual (karena perlu Python environment)

## ✅ Test

### 1. Test Login/Register
- Buka frontend: `http://localhost:5173`
- Klik "Masuk" atau "Daftar"
- Harus berfungsi tanpa error

### 2. Test ML Detection
- Login sebagai Petani
- Buka Monitoring
- Upload foto
- Klik "Deteksi"
- Harus muncul hasil deteksi

## 🐛 Troubleshooting

### Backend tidak bisa diakses?

1. **Cek apakah backend berjalan:**
   ```bash
   # Di terminal backend, harus ada:
   ✅ Backend server running on http://localhost:3000
   ```

2. **Cek port 3000:**
   ```bash
   netstat -ano | findstr :3000
   ```

3. **Restart backend:**
   - Tekan `Ctrl + C` di terminal backend
   - Jalankan lagi: `npm start`

### ML Service tidak bisa diakses?

1. **Cek apakah ML service berjalan:**
   ```bash
   # Di terminal ML service, harus ada:
   🚀 ML Detection Service is starting...
   📍 Service URL: http://localhost:5000
   ```

2. **Cek dependencies:**
   ```bash
   cd "machine learning/Project"
   pip install -r requirements_ml_api.txt
   ```

### Frontend masih connect ke Netlify?

1. **Cek environment variables:**
   - Pastikan `VITE_API_BASE_URL` TIDAK di-set
   - Atau hapus di Vercel

2. **Clear browser cache:**
   - Tekan `Ctrl + Shift + R` (hard refresh)
   - Atau buka incognito mode

3. **Cek console log:**
   - Buka DevTools (F12) > Console
   - Cari: `API Configuration:`
   - Pastikan `API_BASE_URL` adalah `http://localhost:3000/api`

## 📝 Catatan

- **Tidak perlu hapus file** `config/api.ts` - sudah punya fallback ke localhost
- **Tidak perlu ubah code** - semua sudah otomatis pakai localhost jika env var tidak ada
- **Cukup jalankan semua service lokal** dan pastikan env var tidak di-set

---

**Semua akan kembali normal jika semua service berjalan lokal!** 🎉

