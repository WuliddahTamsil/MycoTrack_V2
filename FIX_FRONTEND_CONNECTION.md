# 🔧 Fix: Frontend Tidak Bisa Connect ke Backend

## ❌ Error:
```
Tidak dapat terhubung ke server. Pastikan backend berjalan di localhost:3000.
```

## 🔍 Penyebab:
Frontend masih menggunakan `localhost:3000` karena:
1. Environment variable di Vercel belum di-update
2. Frontend belum di-redeploy setelah update environment variable

## ✅ Solusi:

### Langkah 1: Update Environment Variable di Vercel

1. **Buka Vercel Dashboard:**
   - Login ke https://vercel.com
   - Pilih project **frontend** Anda (bukan backend)

2. **Buka Settings:**
   - Klik **Settings** > **Environment Variables**

3. **Cek/Create Variable:**
   - Cari variable `VITE_API_BASE_URL`
   - Jika belum ada, klik **Add New**
   - Jika sudah ada, klik untuk edit

4. **Update Value:**
   ```
   Key: VITE_API_BASE_URL
   Value: https://vermillion-starship-ad2a6e.netlify.app
   ```
   **PENTING:** 
   - Jangan tambahkan `/api` di akhir
   - Pastikan menggunakan `https://`
   - Pastikan URL benar (copy dari Netlify)

5. **Environment:**
   - Pilih **Production**, **Preview**, dan **Development**
   - Atau minimal pilih **Production**

6. **Save**

### Langkah 2: Redeploy Frontend

**Opsi A: Manual Redeploy**
1. Klik tab **Deployments**
2. Klik **...** (three dots) pada deployment terbaru
3. Klik **Redeploy**
4. Tunggu sampai selesai

**Opsi B: Trigger dengan Commit**
1. Buat commit kecil (misalnya update README)
2. Push ke GitHub
3. Vercel akan auto-deploy

### Langkah 3: Verifikasi

1. **Buka frontend URL** di browser
2. **Buka DevTools** (F12)
3. **Buka tab Console**
4. **Cari log:** `API Configuration:`
5. **Pastikan `API_BASE_URL`** menunjuk ke Netlify URL, bukan localhost

**Contoh log yang benar:**
```
API Configuration: {
  API_BASE_URL: "https://vermillion-starship-ad2a6e.netlify.app/api",
  ...
}
```

**Contoh log yang salah:**
```
API Configuration: {
  API_BASE_URL: "http://localhost:3000/api",  ← SALAH!
  ...
}
```

## 🧪 Test

1. **Buka frontend** di browser
2. **Coba login/register**
3. **Buka DevTools** > **Network tab**
4. **Lihat request:**
   - Request harus ke: `https://vermillion-starship-ad2a6e.netlify.app/api/...`
   - Bukan ke: `http://localhost:3000/api/...`

## 🐛 Troubleshooting

### Masih ke localhost?

1. **Cek environment variable:**
   - Pastikan sudah di-set di Vercel
   - Pastikan value benar (tanpa `/api` di akhir)
   - Pastikan environment dipilih (Production)

2. **Clear browser cache:**
   - Tekan `Ctrl + Shift + R` (hard refresh)
   - Atau buka incognito mode

3. **Cek deployment logs:**
   - Vercel Dashboard > Deployments > Logs
   - Pastikan build berhasil
   - Cek apakah environment variable terbaca

### Error CORS?

1. **Update CORS di Netlify:**
   - Netlify Dashboard > Site settings > Environment variables
   - Tambahkan:
     ```
     CORS_ORIGIN=https://your-frontend.vercel.app
     ```
   - Redeploy backend di Netlify

### Backend tidak bisa diakses?

1. **Test backend langsung:**
   ```
   https://vermillion-starship-ad2a6e.netlify.app/api/health
   ```
   Harus return JSON dengan status ok

2. **Cek Netlify logs:**
   - Netlify Dashboard > Deployments > Logs
   - Cari error

## ✅ Checklist

- [ ] Environment variable `VITE_API_BASE_URL` sudah di-set di Vercel
- [ ] Value URL backend Netlify (tanpa `/api`)
- [ ] Environment dipilih (Production)
- [ ] Frontend sudah di-redeploy
- [ ] Browser cache sudah di-clear
- [ ] Console log menunjukkan URL Netlify (bukan localhost)
- [ ] Network tab menunjukkan request ke Netlify

---

**Setelah update environment variable dan redeploy, frontend akan connect ke backend Netlify!** 🚀

