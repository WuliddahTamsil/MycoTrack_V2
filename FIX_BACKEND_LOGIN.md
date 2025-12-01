# 🔧 Fix Backend Login Error - Panduan Lengkap

## ✅ Backend Sudah Berjalan!

Health check berhasil: `http://localhost:3000/api/health`

## 🔍 Langkah Diagnosa:

### 1. Test Login Endpoint Langsung

**Test di Browser Console (F12):**

```javascript
// Test Customer Login
fetch('http://localhost:3000/api/customer/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'customer@test.com', 
    password: 'password123' 
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

**Atau test Admin Login:**

```javascript
fetch('http://localhost:3000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'adminmyc@gmail.com', 
    password: '12345678' 
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### 2. Cek Terminal Backend

Saat login dari frontend, terminal backend HARUS menampilkan:
```
=== CUSTOMER LOGIN REQUEST ===
Email: ...
Has password: true
...
✅ Login successful for: ...
```

**Jika TIDAK ada log ini:**
- Request TIDAK sampai ke backend
- Cek CORS
- Cek URL di frontend

### 3. Cek Browser Console (F12)

Buka frontend dan coba login, lalu cek:
- **Console tab:** Apakah ada error?
- **Network tab:** 
  - Request ke URL mana?
  - Status code berapa? (200, 400, 401, 404, 500?)
  - Response body apa?

### 4. Cek File Data

Pastikan file data ada:
- `backend/data/customers.json`
- `backend/data/petanis.json`
- `backend/data/admin.json`

## 🐛 Common Errors & Solutions:

### Error: "Tidak dapat terhubung ke server"

**Penyebab:** Frontend tidak bisa connect ke backend

**Solusi:**
1. Pastikan backend berjalan: `http://localhost:3000/api/health`
2. Cek URL di frontend console log
3. Pastikan tidak ada environment variable yang set ke Netlify
4. Clear browser cache: `Ctrl + Shift + R`

### Error: "Email atau password salah"

**Penyebab:** Email/password tidak match atau user belum accepted

**Solusi:**
1. Cek file `backend/data/customers.json` atau `petanis.json`
2. Pastikan email dan password benar
3. Pastikan status user adalah `"accepted"` (bukan `"pending"`)

### Error: CORS

**Penyebab:** CORS tidak dikonfigurasi dengan benar

**Solusi:**
1. Backend sudah support CORS untuk `localhost:5173`
2. Pastikan frontend berjalan di `http://localhost:5173`
3. Cek browser console untuk error CORS

### Error: 404 Not Found

**Penyebab:** Endpoint tidak ditemukan

**Solusi:**
1. Pastikan URL benar: `http://localhost:3000/api/customer/login`
2. Pastikan backend sudah restart setelah perubahan
3. Cek terminal backend untuk error

### Error: 500 Internal Server Error

**Penyebab:** Error di server

**Solusi:**
1. Cek terminal backend untuk error message
2. Cek file data apakah ada dan valid JSON
3. Restart backend

## 🔧 Quick Fix:

### 1. Restart Backend

```bash
# Stop backend (Ctrl+C di terminal backend)
# Start lagi:
cd backend
npm start
```

### 2. Test dengan Script

```bash
cd backend
node test-endpoints.js
```

Harus muncul:
- ✅ Health Check: PASS
- ✅ Admin Login: PASS

### 3. Cek Frontend Console

Buka frontend > F12 > Console
Cari log: `API Configuration:`

Harus menunjukkan:
```
API_BASE_URL: "http://localhost:3000/api"
```

**Jika masih menunjukkan Netlify URL:**
- Hapus environment variable di Vercel
- Redeploy frontend
- Atau clear browser cache

## 📝 Checklist:

- [ ] Backend berjalan di `http://localhost:3000`
- [ ] Health check berhasil
- [ ] Frontend console menunjukkan localhost (bukan Netlify)
- [ ] Test login endpoint langsung (dari browser console)
- [ ] Cek terminal backend untuk log saat login
- [ ] Cek browser Network tab untuk request/response
- [ ] File data (`customers.json`, `admin.json`) ada dan valid

---

**Coba test login dulu dan beri tahu error message yang muncul!** 🚀

