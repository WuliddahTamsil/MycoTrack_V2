# 🚀 Deployment Guide - MycoTrack

Panduan lengkap untuk deploy MycoTrack ke production.

## 📚 Dokumentasi Deployment

1. **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Ringkasan singkat
2. **[DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md)** - Quick start (10 menit)
3. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Panduan lengkap step-by-step
4. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Checklist deployment

## 🎯 Quick Start

**Ingin deploy cepat?** Baca: [DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md)

**Ingin panduan lengkap?** Baca: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📦 Komponen yang Perlu Deploy

1. **Backend** → Vercel
2. **ML Service** → Railway atau Render
3. **Frontend** → Vercel (sudah di-deploy)

## ⚡ Langkah Cepat

### 1. Deploy Backend (5 menit)
```
Vercel → New Project → Import GitHub → Root: backend → Deploy
```

### 2. Deploy ML Service (5 menit)
```
Railway → New Project → Deploy from GitHub → Root: machine learning/Project → Deploy
```

### 3. Update Frontend (2 menit)
```
Vercel → Frontend Project → Environment Variables → Update URLs → Redeploy
```

## ✅ Setelah Deployment

1. Test health check endpoints
2. Test login/register dari frontend
3. Test ML detection dari dashboard petani

## 🆘 Butuh Bantuan?

- Cek logs di platform hosting
- Pastikan environment variables sudah benar
- Lihat troubleshooting di `DEPLOYMENT_GUIDE.md`

---

**Selamat deploy! 🎉**
