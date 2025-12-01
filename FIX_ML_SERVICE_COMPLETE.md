# 🔧 Fix ML Service - Solusi Lengkap

## 🔍 Masalah:

**Error:**
```
timeout of 30000ms exceeded
ML service mungkin tidak berjalan
Status: 500 Internal Server Error
```

**ML service tidak bisa diakses di port 5000**

## ✅ Solusi Step-by-Step:

### Langkah 1: Kill Semua Python Process

**Di PowerShell atau CMD:**
```bash
taskkill /F /IM python.exe
```

**Atau di Task Manager:**
- Ctrl + Shift + Esc
- Cari `python.exe`
- End task semua

### Langkah 2: Cek Dependencies

**Test apakah dependencies terinstall:**
```bash
cd "machine learning\Project"
python -c "import flask; import torch; import cv2; print('OK')"
```

**Jika error:**
```bash
pip install -r requirements_ml_api.txt
```

### Langkah 3: Cek Model File

**Pastikan model ada:**
```bash
cd "machine learning\Project"
dir weights\best.pt
```

**Jika tidak ada:**
- Model belum di-training
- Butuh train model dulu (tapi ini butuh waktu lama)
- Untuk testing, bisa skip dulu (service akan start tapi detection akan fail)

### Langkah 4: Start ML Service

**Jalankan ML service:**
```bash
cd "machine learning\Project"
python ml_api_service.py
```

**Atau gunakan script:**
Double-click: `START_ML_SERVICE.bat`

**Tunggu sampai melihat:**
```
[INFO] Model loaded successfully!
🚀 ML Detection Service is starting...
 * Running on http://127.0.0.1:5000
```

**PENTING:** Model loading butuh waktu **30-60 detik**!

### Langkah 5: Test Health Check

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
- Tunggu lebih lama (model masih loading)
- Cek terminal ML service untuk error
- Pastikan tidak ada error di terminal

### Langkah 6: Test dari Backend

**Buka browser:**
```
http://localhost:3000/api/ml/health
```

**Harus return JSON dengan status healthy**

### Langkah 7: Test Detection

1. **Buka frontend:** `http://localhost:5177`
2. **Login sebagai Petani**
3. **Buka Monitoring**
4. **Upload foto**
5. **Klik "Deteksi"**
6. **Harus berhasil!**

## 🐛 Troubleshooting:

### ML Service Tidak Start

**Error: "ModuleNotFoundError"**
```bash
cd "machine learning\Project"
pip install -r requirements_ml_api.txt
```

**Error: "Model not found"**
- Service akan start tapi detection akan fail
- Untuk testing, bisa skip dulu
- Untuk production, butuh train model

### ML Service Start Tapi Timeout

**Solusi 1: Increase Timeout**

Edit `backend/server.js`:
- Line 3421: `timeout: 60000` (ubah dari 30000)
- Line 3438: `timeout: 60000` (ubah dari 30000)

**Solusi 2: Tunggu Model Load**

Model pertama kali load butuh waktu lama (30-60 detik)
- Tunggu sampai terminal ML service menunjukkan "Model loaded successfully!"
- Test health check lagi

### ML Service Hang

**Solusi:**
1. Kill semua Python: `taskkill /F /IM python.exe`
2. Restart ML service
3. Tunggu model load selesai

## 📝 Checklist:

- [ ] Semua Python process sudah di-kill
- [ ] Dependencies sudah terinstall
- [ ] Model file ada (atau skip untuk testing)
- [ ] ML service sudah di-start
- [ ] Model sudah loaded (cek log terminal)
- [ ] Health check berhasil: `http://localhost:5000/health`
- [ ] Backend health check berhasil: `http://localhost:3000/api/ml/health`
- [ ] Test detection dari frontend berhasil

## 🎯 Quick Fix:

1. **Kill Python:**
   ```bash
   taskkill /F /IM python.exe
   ```

2. **Start ML service:**
   ```bash
   cd "machine learning\Project"
   python ml_api_service.py
   ```

3. **Tunggu 30-60 detik** untuk model load

4. **Test health:**
   ```
   http://localhost:5000/health
   ```

5. **Test detection dari frontend**

---

**Jalankan ML service dan tunggu model load selesai!** 🚀

