# ⚙️ Setup Environment Variables di Netlify Backend

## 🎯 Yang Perlu Di-Set

Backend perlu environment variables untuk:
1. **CORS_ORIGIN** - Mengizinkan request dari frontend
2. **ML_SERVICE_URL** - URL ML service (setelah di-deploy)
3. **PORT** - Port server (optional, default 3000)

## 📋 Langkah-langkah:

### 1. Buka Netlify Dashboard

1. **Login ke Netlify:**
   - Buka: https://app.netlify.com
   - Login dengan akun Anda

2. **Pilih Site Backend:**
   - Klik site: **MycoTrack_V2** (atau nama site backend Anda)
   - URL: `https://vermillion-starship-ad2a6e.netlify.app`

### 2. Buka Site Settings

1. **Klik "Site settings"** (di menu kiri)
2. **Scroll ke bawah**
3. **Klik "Environment variables"** (di bagian Build & deploy)

### 3. Tambahkan Environment Variables

Klik **"Add a variable"** dan tambahkan satu per satu:

#### Variable 1: CORS_ORIGIN

```
Key: CORS_ORIGIN
Value: https://your-frontend.vercel.app
```

**Cara dapat URL frontend:**
- Buka Vercel Dashboard
- Pilih project frontend
- Copy URL deployment (contoh: `https://myco-track-v2.vercel.app`)

**Jika belum tahu URL frontend:**
- Bisa pakai wildcard: `https://*.vercel.app`
- Atau tambahkan nanti setelah tahu URL frontend

#### Variable 2: ML_SERVICE_URL (Optional - Tambahkan Setelah ML Service Deploy)

```
Key: ML_SERVICE_URL
Value: https://your-ml-service.railway.app
```

**Tambahkan setelah ML service di-deploy**

#### Variable 3: PORT (Optional)

```
Key: PORT
Value: 3000
```

**Ini optional, Netlify akan set otomatis**

### 4. Save dan Redeploy

1. **Klik "Save"** setelah menambahkan semua variables
2. **Kembali ke "Deployments" tab**
3. **Klik "Trigger deploy"** > **"Deploy site"**
4. **Tunggu deployment selesai**

## ✅ Verifikasi

### Test Backend:

1. **Buka di browser:**
   ```
   https://vermillion-starship-ad2a6e.netlify.app/api/health
   ```

2. **Harus return:**
   ```json
   {
     "status": "ok",
     "message": "Backend is running"
   }
   ```

### Test dari Frontend:

1. **Buka frontend URL**
2. **Coba login/register**
3. **Buka DevTools (F12)** > **Network tab**
4. **Lihat request:**
   - Harus berhasil (status 200)
   - Tidak ada error CORS

## 🐛 Troubleshooting

### Error: CORS blocked

**Solusi:**
- Pastikan `CORS_ORIGIN` sudah di-set dengan URL frontend yang benar
- Pastikan URL frontend menggunakan `https://`
- Redeploy backend setelah update environment variable

### Error: Backend tidak bisa diakses

**Solusi:**
- Cek Netlify deployment logs
- Pastikan build berhasil
- Pastikan environment variables sudah di-save

### Error: 404 Not Found

**Solusi:**
- Pastikan endpoint benar: `/api/health`
- Cek Netlify logs untuk error

## 📝 Checklist

- [ ] Buka Netlify Dashboard
- [ ] Pilih site backend
- [ ] Buka Site settings > Environment variables
- [ ] Tambahkan `CORS_ORIGIN` dengan URL frontend
- [ ] Save environment variables
- [ ] Redeploy backend
- [ ] Test health check endpoint
- [ ] Test dari frontend

---

**Setelah setup environment variables, backend akan bisa menerima request dari frontend!** 🚀

