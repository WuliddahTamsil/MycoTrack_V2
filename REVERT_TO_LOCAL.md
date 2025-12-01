# 🔄 Kembalikan ke Localhost (Kondisi Awal)

## ✅ Yang Perlu Dilakukan

Karena semua file sudah diubah untuk menggunakan `config/api.ts`, kita hanya perlu memastikan environment variable tidak di-set, sehingga akan fallback ke localhost.

## 🎯 Solusi Cepat

### 1. Pastikan Environment Variables TIDAK Di-Set

**Di Vercel (Frontend):**
1. Buka Vercel Dashboard > Frontend project
2. Settings > Environment Variables
3. **HAPUS atau RENAME** variable `VITE_API_BASE_URL` jika ada
4. Redeploy frontend

**Atau lebih mudah:**
- Tidak perlu hapus, cukup pastikan tidak ada value
- File `api.ts` akan otomatis fallback ke localhost jika env var tidak ada

### 2. Pastikan Backend Berjalan Lokal

**Jalankan backend di local:**
```bash
cd backend
npm start
```

Backend harus berjalan di: `http://localhost:3000`

### 3. Pastikan ML Service Berjalan Lokal

**Jalankan ML service:**
```bash
cd "machine learning/Project"
python ml_api_service.py
```

ML service harus berjalan di: `http://localhost:5000`

### 4. Jalankan Frontend

**Jalankan frontend:**
```bash
cd frontend
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

## 🔍 Verifikasi

### Test Backend:
```
http://localhost:3000/api/health
```
Harus return: `{"status":"ok","message":"Backend is running"}`

### Test ML Service:
```
http://localhost:5000/health
```
Harus return JSON dengan status healthy

### Test Frontend:
1. Buka: `http://localhost:5173`
2. Buka DevTools (F12) > Console
3. Cari log: `API Configuration:`
4. Pastikan:
   ```
   API_BASE_URL: "http://localhost:3000/api"
   ML_API_BASE_URL: "http://localhost:3000/api/ml"
   ```

## 📝 File yang Tidak Perlu Dihapus

File-file berikut TIDAK perlu dihapus, karena sudah punya fallback ke localhost:
- ✅ `frontend/src/config/api.ts` - Sudah punya fallback ke localhost
- ✅ Semua file yang menggunakan `import { API_BASE_URL } from '../../config/api'` - Akan otomatis pakai localhost

## 🎯 Cara Kerja

File `api.ts` sudah punya logic:
```typescript
if (envUrl) {
  // Pakai environment variable jika ada
} else if (import.meta.env.DEV) {
  // Pakai localhost untuk development
  return 'http://localhost:3000/api';
}
```

Jadi jika environment variable TIDAK di-set, akan otomatis pakai localhost!

## ✅ Checklist

- [ ] Environment variable `VITE_API_BASE_URL` TIDAK di-set di Vercel (atau dihapus)
- [ ] Backend berjalan di `http://localhost:3000`
- [ ] ML service berjalan di `http://localhost:5000`
- [ ] Frontend berjalan di `http://localhost:5173`
- [ ] Console log menunjukkan localhost (bukan Netlify)
- [ ] Login/register berfungsi
- [ ] ML detection berfungsi

---

**Tidak perlu hapus file! Cukup pastikan environment variable tidak di-set dan semua service berjalan lokal.** 🚀

