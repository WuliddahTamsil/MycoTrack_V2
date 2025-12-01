# ⚠️ Netlify untuk Backend Express - Catatan Penting

## ⚠️ Peringatan

**Netlify TIDAK ideal untuk Express backend biasa!**

Netlify lebih cocok untuk:
- ✅ Frontend static sites (React, Vue, etc)
- ✅ Netlify Functions (serverless functions kecil)

Untuk Express backend, lebih baik pakai:
- ✅ **Vercel** (recommended - gratis, mudah)
- ✅ **Render** (free tier)
- ✅ **Railway** ($5 credit gratis)

## 🔧 Konfigurasi Netlify (Jika Tetap Mau Pakai)

Jika tetap mau deploy backend ke Netlify, isi dengan:

```
Branch to deploy: main                        ✓
Base directory: backend                       ← ISI INI
Build command: npm install                    ← ISI INI
Publish directory: (kosongkan)                 ← KOSONGKAN
Functions directory: (kosongkan)              ← KOSONGKAN
```

### Detail:

1. **Base directory:** `backend`
   - Netlify akan install dependencies di folder ini

2. **Build command:** `npm install`
   - Atau bisa dikosongkan (Netlify akan otomatis install)

3. **Publish directory:** (kosongkan)
   - Backend tidak punya build output
   - Tidak perlu publish directory

4. **Functions directory:** (kosongkan)
   - Kita pakai Express biasa, bukan Netlify Functions

## ⚙️ Environment Variables

Setelah deploy, tambahkan environment variables:

1. Klik **Site settings** > **Environment variables**
2. Tambahkan:
   ```
   CORS_ORIGIN=https://your-frontend.vercel.app
   ML_SERVICE_URL=https://your-ml-service.railway.app
   PORT=3000
   ```

## 📝 File netlify.toml (Optional)

Buat file `netlify.toml` di root project:

```toml
[build]
  base = "backend"
  command = "npm install"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
```

**TAPI:** Ini akan memerlukan konfigurasi Netlify Functions yang lebih kompleks.

## 🎯 Rekomendasi

**Lebih baik pakai Vercel untuk backend:**
- ✅ Lebih mudah setup
- ✅ Support Express langsung
- ✅ 100% gratis
- ✅ Tidak perlu konfigurasi khusus

**Atau pakai Render:**
- ✅ Free tier tersedia
- ✅ Support Express langsung
- ✅ Auto-deploy dari GitHub

---

**Saran: Deploy backend ke Vercel atau Render, bukan Netlify!**

