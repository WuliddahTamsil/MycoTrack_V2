# ✅ FIX CORS ERROR - Solusi Lengkap

## 🔍 Masalah yang Ditemukan:

**Error CORS:**
```
Access to fetch at 'http://localhost:3000/api/customer/login' 
from origin 'http://localhost:5177' has been blocked by CORS policy
```

**Penyebab:**
- Frontend berjalan di port **5177** (bukan 5173)
- Backend CORS hanya mengizinkan port 5173 dan 5174
- Port 5177 tidak ada di whitelist CORS

## ✅ Solusi yang Sudah Diterapkan:

### 1. Update CORS di Backend

Saya sudah update `backend/server.js` untuk mengizinkan port 5177:
- ✅ Port 5173, 5174, 5175, 5176, 5177 sudah ditambahkan
- ✅ CORS sekarang support semua port Vite (5173-5177)

### 2. Restart Backend

**PENTING:** Backend perlu di-restart agar perubahan CORS aktif!

**Langkah:**
1. **Stop backend** (Ctrl+C di terminal backend)
2. **Start lagi:**
   ```bash
   cd backend
   npm start
   ```

### 3. Test Login

Setelah backend restart:
1. **Buka frontend:** `http://localhost:5177`
2. **Coba login**
3. **Harus berhasil!**

## 🔧 Alternatif: Gunakan Port 5173

Jika mau pakai port 5173 (default):

1. **Kill semua proses Node:**
   ```bash
   # Di PowerShell:
   Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
   ```

2. **Start backend:**
   ```bash
   cd backend
   npm start
   ```

3. **Start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Frontend akan pakai port 5173** (default)

## ✅ Checklist:

- [x] CORS di backend sudah di-update untuk port 5177
- [ ] Backend sudah di-restart
- [ ] Frontend berjalan di `http://localhost:5177`
- [ ] Test login berhasil
- [ ] Tidak ada error CORS lagi

## 🎯 Quick Fix:

**Cara tercepat:**
1. **Restart backend** (Ctrl+C lalu `npm start`)
2. **Refresh frontend** (Ctrl + Shift + R)
3. **Test login**

---

**Restart backend dulu, lalu test login lagi!** 🚀

