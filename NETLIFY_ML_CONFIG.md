# ⚠️ Netlify untuk ML Service (Python/Flask) - Catatan Penting

## ⚠️ Peringatan

**Netlify TIDAK ideal untuk Python/Flask service!**

Netlify lebih cocok untuk:
- ✅ Frontend static sites
- ✅ Netlify Functions (JavaScript/TypeScript)

Untuk Python/Flask ML service, lebih baik pakai:
- ✅ **Render** (recommended - free tier, mudah)
- ✅ **Railway** ($5 credit gratis)
- ✅ **Fly.io** (free tier)

## 🔧 Konfigurasi Netlify (Jika Tetap Mau Pakai)

Jika tetap mau deploy ML service ke Netlify, isi dengan:

```
Branch to deploy: main                        ✓
Base directory: machine learning/Project      ✓ (sudah benar)
Build command: pip install -r requirements_ml_api.txt    ← PERBAIKI INI
Publish directory: (kosongkan)                ← PERBAIKI INI
Functions directory: (kosongkan)              ← PERBAIKI INI
```

### Detail:

1. **Base directory:** `machine learning/Project` ✓ (sudah benar)

2. **Build command:** `pip install -r requirements_ml_api.txt`
   - **SALAH:** `python ml_api_service.py` (ini start command, bukan build)
   - **BENAR:** `pip install -r requirements_ml_api.txt` (install dependencies)

3. **Publish directory:** (kosongkan)
   - ML service tidak punya build output
   - Tidak perlu publish directory

4. **Functions directory:** (kosongkan)
   - Kita pakai Flask biasa, bukan Netlify Functions

## ⚙️ Start Command (Netlify Functions)

**MASALAH:** Netlify tidak support long-running Python processes secara langsung!

Netlify Functions hanya untuk:
- Serverless functions (short-lived)
- Request-response pattern
- Tidak cocok untuk Flask app yang running terus

## 🎯 Rekomendasi

**Lebih baik deploy ML service ke Render:**

### Render (Recommended):

1. **Buka:** https://render.com
2. **New Web Service** > Connect GitHub repo
3. **Settings:**
   ```
   Root Directory: machine learning/Project
   Build Command: pip install -r requirements_ml_api.txt
   Start Command: python ml_api_service.py
   ```
4. **Environment Variables:**
   ```
   PORT=5000
   MODEL_PATH=weights/best.pt
   ```
5. **Deploy** (GRATIS dengan free tier!)

**Atau Railway:**

1. **Buka:** https://railway.app
2. **New Project** > Deploy from GitHub
3. **Add Service:**
   ```
   Root Directory: machine learning/Project
   Build: pip install -r requirements_ml_api.txt
   Start: python ml_api_service.py
   ```
4. **Deploy** ($5 credit gratis)

## 📝 File netlify.toml untuk ML Service (Jika Tetap Pakai Netlify)

Buat file `netlify.toml` di `machine learning/Project/`:

```toml
[build]
  base = "machine learning/Project"
  command = "pip install -r requirements_ml_api.txt"
  publish = "."

[build.environment]
  PYTHON_VERSION = "3.10"
```

**TAPI:** Netlify tidak akan bisa run Flask app sebagai long-running service!

## ✅ Konfigurasi yang BENAR untuk Netlify:

```
Base directory: machine learning/Project      ✓
Build command: pip install -r requirements_ml_api.txt    ← PERBAIKI
Publish directory: (kosongkan)                ← PERBAIKI
Functions directory: (kosongkan)              ← PERBAIKI
```

**TAPI:** Netlify tidak akan bisa run service ini dengan benar!

---

## 🎯 Rekomendasi Final

**JANGAN pakai Netlify untuk ML service!**

**Pakai Render atau Railway:**
- ✅ Support Python/Flask langsung
- ✅ Long-running processes
- ✅ Free tier tersedia
- ✅ Auto-deploy dari GitHub

---

**Saran: Deploy ML service ke Render atau Railway, bukan Netlify!**

