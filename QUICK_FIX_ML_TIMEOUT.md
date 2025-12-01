# ⚡ Quick Fix ML Service Timeout

## 🔍 Masalah:

**Error:**
```
timeout of 30000ms exceeded
ML service mungkin tidak berjalan
Status: 500 Internal Server Error
```

## ✅ Solusi Cepat:

### Langkah 1: Kill dan Restart ML Service

**Stop semua ML service:**
```bash
taskkill /F /IM python.exe
```

**Start ML service:**
```bash
cd "machine learning\Project"
python ml_api_service.py
```

**Atau gunakan script:**
Double-click: `START_ML_SERVICE.bat`

### Langkah 2: Tunggu Model Load

**PENTING:** Model pertama kali load butuh waktu **30-60 detik**!

**Tunggu sampai melihat:**
```
[INFO] Model loaded successfully!
🚀 ML Detection Service is starting...
 * Running on http://127.0.0.1:5000
```

### Langkah 3: Test Health Check

**Buka browser:**
```
http://localhost:5000/health
```

**Harus return:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

**Jika masih timeout:**
- Tunggu lebih lama (model loading butuh waktu)
- Cek terminal ML service untuk error
- Pastikan file `weights/best.pt` ada

### Langkah 4: Test dari Backend

**Buka browser:**
```
http://localhost:3000/api/ml/health
```

**Harus return JSON dengan status healthy**

### Langkah 5: Test Detection

1. **Buka frontend:** `http://localhost:5177`
2. **Login sebagai Petani**
3. **Buka Monitoring**
4. **Upload foto**
5. **Klik "Deteksi"**
6. **Harus berhasil!**

## 🐛 Jika Masih Timeout:

### 1. Increase Timeout di Backend

Edit `backend/server.js` line 3421 dan 3438:
```javascript
timeout: 60000 // Ubah dari 30000 ke 60000 (60 detik)
```

### 2. Cek Model File

```bash
cd "machine learning\Project"
dir weights\best.pt
```

**Jika tidak ada:**
- Model belum di-training
- Butuh train model dulu

### 3. Cek Dependencies

```bash
cd "machine learning\Project"
pip install -r requirements_ml_api.txt
```

## ✅ Checklist:

- [ ] ML service berjalan (cek terminal)
- [ ] Model loaded (cek log: "Model loaded successfully!")
- [ ] Health check berhasil: `http://localhost:5000/health`
- [ ] Backend health check berhasil: `http://localhost:3000/api/ml/health`
- [ ] Test detection dari frontend berhasil

## 🎯 Quick Test:

**Test ML service langsung:**
```bash
curl http://localhost:5000/health
```

**Test dari backend:**
```bash
curl http://localhost:3000/api/ml/health
```

---

**Tunggu model load selesai (30-60 detik), lalu test lagi!** 🚀

