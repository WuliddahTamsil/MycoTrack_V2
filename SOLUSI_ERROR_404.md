# SOLUSI ERROR 404 - Endpoint Tidak Ditemukan

## Masalah
Error 404 berarti backend **TIDAK BISA DIAKSES** atau endpoint **TIDAK TERDAFTAR**.

## Langkah-langkah Perbaikan

### 1. PASTIKAN BACKEND BERJALAN

Buka terminal baru dan jalankan:

```bash
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

**HARUS** muncul output:
```
==================================================
✅ Backend server running on http://localhost:3000
✅ Health check: http://localhost:3000/api/health
==================================================
```

Jika **TIDAK** muncul, berarti backend **TIDAK BERJALAN**!

### 2. TEST BACKEND DI BROWSER

Buka browser dan akses:
```
http://localhost:3000/api/health
```

**HARUS** muncul JSON:
```json
{"status":"ok","message":"Backend is running"}
```

Jika **TIDAK** muncul, berarti backend **TIDAK BERJALAN**!

### 3. TEST ENDPOINT LOGIN

Buka browser console (F12) dan jalankan:

```javascript
fetch('http://localhost:3000/api/customer/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

**HARUS** return JSON (bukan 404):
- Jika 401: Backend berjalan, tapi email/password salah (INI NORMAL)
- Jika 404: Backend TIDAK berjalan atau route TIDAK terdaftar

### 4. CEK TERMINAL BACKEND

Saat mencoba login dari frontend, terminal backend **HARUS** menampilkan:
```
2025-01-XX - POST /api/customer/login
=== CUSTOMER LOGIN REQUEST ===
```

Jika **TIDAK ADA LOG INI**, berarti request **TIDAK SAMPAI** ke backend!

### 5. CEK PORT 3000

Jalankan di terminal:
```bash
netstat -ano | findstr :3000
```

Harus ada proses yang listening di port 3000.

## Penyebab Umum Error 404

1. **Backend tidak berjalan** → Jalankan `npm start` di folder backend
2. **Port 3000 sudah digunakan** → Stop aplikasi lain atau ubah port
3. **Backend crash saat startup** → Cek error di terminal
4. **Route tidak terdaftar** → Restart backend setelah perubahan kode

## Quick Fix

1. **Stop semua proses Node.js:**
   ```bash
   taskkill /F /IM node.exe
   ```

2. **Start backend:**
   ```bash
   cd "D:\RPL_Kelompok 4 - NOVA\backend"
   npm start
   ```

3. **Test di browser:**
   ```
   http://localhost:3000/api/health
   ```

4. **Jika berhasil, coba login lagi dari frontend**

## File Helper

Saya sudah buat file `START_BACKEND.bat` dan `START_BACKEND.ps1` di folder backend.
Double-click file tersebut untuk start backend dengan mudah.

