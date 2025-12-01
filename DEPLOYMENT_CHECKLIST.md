# ✅ Deployment Checklist

Gunakan checklist ini untuk memastikan semua langkah deployment sudah dilakukan.

## 📦 Pre-Deployment

- [ ] Semua file sudah di-commit ke GitHub
- [ ] Repository sudah di-push ke GitHub
- [ ] File `weights/best.pt` ada di `machine learning/Project/weights/`
- [ ] File `vercel.json` ada di folder `backend/`
- [ ] File `railway.json` ada di folder `machine learning/Project/`

## 🚀 Backend Deployment (Vercel)

- [ ] Akun Vercel sudah dibuat
- [ ] Project backend sudah di-import ke Vercel
- [ ] Root directory di-set ke `backend`
- [ ] Environment variables sudah di-set:
  - [ ] `CORS_ORIGIN`
  - [ ] `ML_SERVICE_URL`
  - [ ] `PORT` (optional)
- [ ] Deployment berhasil
- [ ] URL backend sudah di-copy (contoh: `https://xxx.vercel.app`)
- [ ] Health check berhasil: `https://xxx.vercel.app/api/health`

## 🤖 ML Service Deployment

### Railway
- [ ] Akun Railway sudah dibuat
- [ ] Project sudah dibuat di Railway
- [ ] Service sudah di-add
- [ ] Root directory di-set ke `machine learning/Project`
- [ ] Build command: `pip install -r requirements_ml_api.txt`
- [ ] Start command: `python ml_api_service.py`
- [ ] Environment variables sudah di-set:
  - [ ] `PORT=5000`
- [ ] Deployment berhasil
- [ ] Public URL sudah di-copy

### Atau Render
- [ ] Akun Render sudah dibuat
- [ ] Web service sudah dibuat
- [ ] Root directory di-set ke `machine learning/Project`
- [ ] Build command: `pip install -r requirements_ml_api.txt`
- [ ] Start command: `python ml_api_service.py`
- [ ] Environment variables sudah di-set
- [ ] Deployment berhasil
- [ ] URL sudah di-copy

## 🎨 Frontend Configuration

- [ ] Buka Vercel Dashboard > Frontend project
- [ ] Environment variables sudah di-update:
  - [ ] `VITE_API_BASE_URL` = URL backend
  - [ ] `VITE_ML_API_BASE_URL` = URL ML service + `/api/ml`
- [ ] Frontend sudah di-redeploy
- [ ] Frontend URL sudah di-copy

## 🧪 Testing

### Backend Testing
- [ ] Health check endpoint berhasil
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] API endpoints bisa diakses

### ML Service Testing
- [ ] Health check endpoint berhasil
- [ ] Model file bisa di-load
- [ ] Detection endpoint bisa diakses

### Frontend Testing
- [ ] Frontend bisa diakses
- [ ] Login berhasil
- [ ] Register berhasil
- [ ] ML Detection berfungsi (untuk petani)
- [ ] Tidak ada error di console browser

## 🔧 Troubleshooting

Jika ada masalah, cek:
- [ ] Logs di Vercel (backend)
- [ ] Logs di Railway/Render (ML service)
- [ ] Network tab di browser (frontend)
- [ ] Environment variables sudah benar
- [ ] CORS sudah dikonfigurasi
- [ ] URLs tidak ada typo

## 📝 Notes

Tulis catatan penting di sini:
- Backend URL: _______________________
- ML Service URL: _______________________
- Frontend URL: _______________________
- Deployment date: _______________________

