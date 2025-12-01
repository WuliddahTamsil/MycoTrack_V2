# ✅ Langkah Selanjutnya Setelah Setup Environment Variables

## 🔧 Perbaikan Kecil (Optional)

Saya lihat value `CORS_ORIGIN` ada slash di akhir: `https://myco-track-v2.vercel.app/`

**Lebih baik tanpa slash:**
- **Saat ini:** `https://myco-track-v2.vercel.app/`
- **Seharusnya:** `https://myco-track-v2.vercel.app` (tanpa `/`)

**Cara perbaiki:**
1. Klik variable `CORS_ORIGIN`
2. Edit value
3. Hapus slash di akhir
4. Save

**Tapi ini optional**, backend tetap bisa jalan dengan slash.

## 📋 Langkah Selanjutnya:

### 1. Redeploy Backend di Netlify

1. **Klik tab "Deployments"** (di menu kiri Netlify)
2. **Klik "Trigger deploy"** (tombol di kanan atas)
3. **Pilih "Deploy site"**
4. **Tunggu deployment selesai** (sekitar 1-2 menit)

**Kenapa perlu redeploy?**
- Environment variables hanya aktif setelah redeploy
- Backend perlu restart untuk membaca environment variables baru

### 2. Update Frontend Environment Variable di Vercel

1. **Buka Vercel Dashboard:**
   - https://vercel.com
   - Login dan pilih project **frontend** (bukan backend)

2. **Buka Settings:**
   - Klik **Settings** > **Environment Variables**

3. **Cek/Create Variable:**
   - Cari `VITE_API_BASE_URL`
   - Jika belum ada, klik **"Add New"**
   - Jika sudah ada, klik untuk edit

4. **Update Value:**
   ```
   Key: VITE_API_BASE_URL
   Value: https://vermillion-starship-ad2a6e.netlify.app
   ```
   **PENTING:** 
   - Jangan tambahkan `/api` di akhir
   - Pastikan menggunakan `https://`
   - Copy URL dari Netlify (tanpa slash di akhir)

5. **Environment:**
   - Pilih **Production**, **Preview**, dan **Development**
   - Atau minimal **Production**

6. **Save**

### 3. Redeploy Frontend di Vercel

1. **Klik tab "Deployments"**
2. **Klik "..." (three dots)** pada deployment terbaru
3. **Klik "Redeploy"**
4. **Tunggu sampai selesai**

### 4. Test Backend

**Test Health Check:**
Buka di browser:
```
https://vermillion-starship-ad2a6e.netlify.app/api/health
```

**Harus return:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### 5. Test dari Frontend

1. **Buka frontend URL:**
   ```
   https://myco-track-v2.vercel.app
   ```

2. **Buka DevTools (F12)**
3. **Buka tab Console**
4. **Cari log:** `API Configuration:`
5. **Pastikan `API_BASE_URL` menunjuk ke Netlify:**
   ```
   API Configuration: {
     API_BASE_URL: "https://vermillion-starship-ad2a6e.netlify.app/api",
     ...
   }
   ```

6. **Coba Login/Register:**
   - Klik tombol "Masuk" atau "Daftar"
   - Isi form
   - Submit

7. **Buka tab Network (di DevTools):**
   - Lihat request yang dikirim
   - Pastikan request ke: `https://vermillion-starship-ad2a6e.netlify.app/api/...`
   - Pastikan status 200 (success) atau 400/401 (validation error, bukan connection error)

## ✅ Checklist

- [ ] CORS_ORIGIN sudah di-set di Netlify (sudah ✓)
- [ ] Backend sudah di-redeploy di Netlify
- [ ] VITE_API_BASE_URL sudah di-set di Vercel (frontend)
- [ ] Frontend sudah di-redeploy di Vercel
- [ ] Backend health check berhasil
- [ ] Console log menunjukkan URL Netlify (bukan localhost)
- [ ] Login/Register berhasil (atau setidaknya tidak ada error connection)

## 🐛 Troubleshooting

### Masih error "Tidak dapat terhubung ke server"?

1. **Cek apakah backend sudah di-redeploy:**
   - Netlify Dashboard > Deployments
   - Pastikan deployment terbaru sudah selesai

2. **Cek apakah frontend sudah di-redeploy:**
   - Vercel Dashboard > Deployments
   - Pastikan deployment terbaru sudah selesai

3. **Clear browser cache:**
   - Tekan `Ctrl + Shift + R` (hard refresh)
   - Atau buka incognito mode

4. **Cek Console log:**
   - Pastikan `API_BASE_URL` bukan localhost
   - Jika masih localhost, environment variable belum terbaca

### Error CORS?

1. **Pastikan CORS_ORIGIN benar:**
   - Value: `https://myco-track-v2.vercel.app` (tanpa slash)
   - Pastikan URL frontend benar

2. **Redeploy backend** setelah update CORS_ORIGIN

### Backend tidak bisa diakses?

1. **Cek Netlify logs:**
   - Netlify Dashboard > Deployments > Logs
   - Cari error

2. **Test health check:**
   - Buka: `https://vermillion-starship-ad2a6e.netlify.app/api/health`
   - Harus return JSON

---

**Langkah paling penting: Redeploy backend dan frontend setelah update environment variables!** 🚀

