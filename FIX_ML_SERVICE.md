# 🔧 Fix ML Service Timeout Error

## 🔍 Masalah:

**Error:**
```
timeout of 30000ms exceeded
ML service mungkin tidak berjalan
Status: 500 Internal Server Error
```

**Penyebab:**
- ML service berjalan di port 5000, tapi tidak merespons dengan benar
- Banyak connection CLOSE_WAIT dan FIN_WAIT (koneksi tidak sehat)
- ML service mungkin hang atau error

## ✅ Solusi:

### Langkah 1: Restart ML Service

**Stop semua ML service:**
```bash
# Kill semua proses Python yang menggunakan port 5000
taskkill /F /IM python.exe
```

**Atau lebih spesifik:**
1. Buka Task Manager (Ctrl + Shift + Esc)
2. Cari proses `python.exe`
3. End task semua proses Python

**Start ML Service lagi:**
```bash
cd "machine learning/Project"
python ml_api_service.py
```

**Pastikan melihat output:**
```
🚀 ML Detection Service is starting...
📍 Service URL: http://localhost:5000
📍 Health check: http://localhost:5000/health
[INFO] Model loaded successfully!
```

### Langkah 2: Test ML Service

**Test health check:**
Buka browser: `http://localhost:5000/health`

**Harus return:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  ...
}
```

**Test dengan curl:**
```bash
curl http://localhost:5000/health
```

### Langkah 3: Test dari Backend

**Test backend ML endpoint:**
Buka browser: `http://localhost:3000/api/ml/health`

**Harus return:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Langkah 4: Cek Terminal ML Service

Saat ada request detection, terminal ML service harus menampilkan:
```
[INFO] Received detection request
[INFO] Processing image...
[INFO] Detection completed
```

**Jika tidak ada log:**
- Request tidak sampai ke ML service
- Cek URL di backend: `ML_SERVICE_URL`

## 🐛 Troubleshooting:

### ML Service Tidak Start

**Error: "ModuleNotFoundError"**
```bash
cd "machine learning/Project"
pip install -r requirements_ml_api.txt
```

**Error: "Model not found"**
- Pastikan file `weights/best.pt` ada
- Cek path di `ml_api_service.py`

### ML Service Start Tapi Tidak Merespons

**Solusi:**
1. Restart ML service
2. Cek terminal untuk error
3. Test health check langsung

### Timeout Masih Terjadi

**Solusi:**
1. **Increase timeout di backend** (optional):
   - Edit `backend/server.js`
   - Ubah `timeout: 30000` menjadi `timeout: 60000` (60 detik)

2. **Cek model loading:**
   - Model pertama kali load butuh waktu lama
   - Tunggu sampai model loaded

3. **Cek image size:**
   - Image terlalu besar bisa timeout
   - Compress image sebelum upload

## ✅ Checklist:

- [ ] ML service berjalan di `http://localhost:5000`
- [ ] Health check berhasil: `http://localhost:5000/health`
- [ ] Backend bisa connect: `http://localhost:3000/api/ml/health`
- [ ] Terminal ML service menunjukkan log saat request
- [ ] Model sudah loaded (cek di health check response)
- [ ] Test detection dari frontend berhasil

## 🎯 Quick Fix:

1. **Kill semua Python:**
   ```bash
   taskkill /F /IM python.exe
   ```

2. **Start ML service:**
   ```bash
   cd "machine learning/Project"
   python ml_api_service.py
   ```

3. **Test health:**
   ```
   http://localhost:5000/health
   ```

4. **Test dari frontend:**
   - Upload foto
   - Klik deteksi
   - Harus berhasil!

---

**Restart ML service dulu, lalu test lagi!** 🚀

