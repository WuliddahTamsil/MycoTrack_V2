# 💡 Solusi GRATIS untuk Deployment

## 🎯 TL;DR - Solusi Terbaik

**TIDAK PERLU BAYAR!** Semua platform punya free tier yang cukup untuk project ini.

## ✅ Rekomendasi: Vercel + Render (100% Gratis)

### 1. Backend → Vercel (GRATIS)
- ✅ Unlimited untuk personal projects
- ✅ Tidak ada sleep/wake up
- ✅ Auto-deploy dari GitHub
- ✅ SSL included

**Cara deploy:**
1. Buka https://vercel.com
2. Import project dari GitHub
3. Root Directory: `backend`
4. Deploy (GRATIS!)

### 2. ML Service → Render (GRATIS)
- ✅ Free tier tersedia
- ✅ Auto-deploy dari GitHub
- ⚠️ Sleep setelah 15 menit idle (wake up dalam 30 detik)

**Cara deploy:**
1. Buka https://render.com
2. New Web Service
3. Connect GitHub repo
4. Root Directory: `machine learning/Project`
5. Build: `pip install -r requirements_ml_api.txt`
6. Start: `python ml_api_service.py`
7. Deploy (GRATIS!)

## 🔄 Alternatif: Pakai Ngrok (Temporary)

**Hanya untuk testing sementara!**

### Setup Ngrok:

1. **Install ngrok:**
   ```bash
   # Download dari https://ngrok.com/download
   # Atau: npm install -g ngrok
   ```

2. **Daftar akun gratis:**
   - Buka https://dashboard.ngrok.com/signup
   - Dapat authtoken

3. **Setup:**
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```

4. **Jalankan backend lokal:**
   ```bash
   cd backend
   npm start
   ```

5. **Expose dengan ngrok:**
   ```bash
   ngrok http 3000
   ```

6. **Copy URL ngrok** dan update di Vercel environment variables

### ⚠️ Limitasi Ngrok:
- URL berubah setiap restart
- Harus keep terminal terbuka
- Tidak cocok untuk production

## 🎯 Rekomendasi Final

**Untuk production:** Pakai Vercel + Render (GRATIS)  
**Untuk testing cepat:** Pakai ngrok (temporary)

## 📚 Dokumentasi

- `DEPLOYMENT_FREE_TIERS.md` - Detail platform gratis
- `NGROK_SETUP.md` - Panduan setup ngrok
- `DEPLOY_QUICK_START.md` - Quick start deployment

---

**TIDAK PERLU BAYAR! Semua bisa pakai free tier.** 🎉

