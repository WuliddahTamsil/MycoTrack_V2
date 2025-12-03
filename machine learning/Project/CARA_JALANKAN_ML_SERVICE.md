# 🚀 Cara Menjalankan ML Service untuk Live Camera Detection

## 📋 Prerequisites

Pastikan sudah ada:
1. ✅ Model dari `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
2. ✅ Python 3.8+ terinstall
3. ✅ Dependencies Python sudah terinstall

## 🔧 Langkah 1: Verifikasi Model Path

Model sudah dikonfigurasi di `config.py` untuk menggunakan:
```
yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
```

**Verifikasi file model ada:**
- Buka folder: `machine learning/Project/yolov5_new/yolov5/runs/train/mushroom_custom/weights/`
- Pastikan file `best.pt` ada di sana

## 🚀 Langkah 2: Install Dependencies (Jika Belum)

**Buka Command Prompt/PowerShell:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
pip install -r requirements_ml_api.txt
```

**ATAU install manual:**

```cmd
pip install flask flask-cors torch torchvision opencv-python numpy Pillow ultralytics
```

> ⏱️ **Catatan:** Install PyTorch bisa memakan waktu 10-15 menit

## 🎯 Langkah 3: Jalankan ML API Service

**Buka Command Prompt/PowerShell baru (Terminal 1):**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**Output yang diharapkan:**
```
============================================================
ML Detection API Service
============================================================
Model path: D:\RPL_Kelompok 4 - NOVA\machine learning\Project\yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
Confidence threshold: 0.15
============================================================
[INFO] Loading model: D:\RPL_Kelompok 4 - NOVA\machine learning\Project\yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
[INFO] Model loaded successfully!
[INFO] Confidence threshold: 0.15
[INFO] Model classes: {...}

============================================================
🚀 ML Detection Service is starting...
============================================================
📍 Service URL: http://localhost:5000
📍 Health check: http://localhost:5000/health
============================================================

⚠️  IMPORTANT: Keep this window open while using detection feature!
   Press CTRL+C to stop the service

============================================================

 * Running on http://0.0.0.0:5000
```

**⚠️ PENTING:** 
- **JANGAN TUTUP** terminal ini!
- Terminal ini harus tetap terbuka saat menggunakan live camera detection
- Service akan berjalan di **port 5000**

## ✅ Langkah 4: Verifikasi ML Service Berjalan

**Buka browser dan kunjungi:**
```
http://localhost:5000/health
```

**Harus muncul:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "D:\\RPL_Kelompok 4 - NOVA\\machine learning\\Project\\yolov5_new\\yolov5\\runs\\train\\mushroom_custom\\weights\\best.pt"
}
```

## 🖥️ Langkah 5: Jalankan Backend Server

**Buka Command Prompt/PowerShell baru (Terminal 2):**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

Backend akan berjalan di `http://localhost:3000`

**Verifikasi koneksi ML Service:**
Buka browser: `http://localhost:3000/api/ml/health`

Harus return: `{"status":"healthy","model_loaded":true}`

## 🌐 Langkah 6: Jalankan Frontend

**Buka Command Prompt/PowerShell baru (Terminal 3):**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 🎥 Langkah 7: Test Live Camera Detection

1. **Buka browser:** `http://localhost:5173/dashboard`
2. **Login sebagai Petani**
3. **Klik "Dashboard Monitoring"**
4. **Pilih mode "Live Camera"**
5. **Klik "Aktifkan Kamera Laptop"**
6. **Klik "Mulai Live Detection"**
7. **Arahkan kamera ke jamur**

**Hasil yang diharapkan:**
- ✅ Video kamera muncul
- ✅ Bounding box muncul di sekitar jamur
- ✅ Label fase pertumbuhan muncul (Primordia/Muda/Matang)
- ✅ FPS counter muncul
- ✅ Info panel menunjukkan jumlah deteksi

## 🔍 Troubleshooting

### ❌ Error: "Model not found"

**Solusi:**
1. Pastikan file model ada di: `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
2. Cek path di `config.py` sudah benar
3. Pastikan berada di folder yang benar saat menjalankan `ml_api_service.py`

### ❌ Error: "ModuleNotFoundError"

**Solusi:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
pip install -r requirements_ml_api.txt
```

### ❌ Error: "Port 5000 already in use"

**Solusi:**
1. Tutup aplikasi lain yang menggunakan port 5000
2. Atau kill proses Python:
   ```cmd
   taskkill /F /IM python.exe
   ```
3. Jalankan lagi: `python ml_api_service.py`

### ❌ Live Detection Tidak Bekerja

**Checklist:**
- [ ] ML Service berjalan di port 5000
- [ ] Backend berjalan di port 3000
- [ ] Frontend berjalan di port 5173
- [ ] Browser console tidak ada error (F12 → Console)
- [ ] Network tab menunjukkan request ke `/api/ml/detect` berhasil (F12 → Network)

### ❌ Tidak Ada Deteksi

**Kemungkinan penyebab:**
1. **Model belum menggunakan model dari yolov5_new**
   - Cek output ML service: harus menunjukkan path ke `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
   
2. **Confidence threshold terlalu tinggi**
   - Model menggunakan threshold 0.15 (sudah rendah)
   - Coba gambar dengan pencahayaan lebih baik

3. **ML Service tidak menerima request**
   - Cek terminal ML service, harus ada log `[DETECT]` saat detection berjalan

## 📝 Catatan Penting

### ✅ Model yang Digunakan

ML Service akan otomatis menggunakan model dari:
```
yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
```

Karena `config.py` sudah diupdate untuk menggunakan path tersebut.

### 🔄 Urutan Menjalankan Services

**Penting: Jalankan dalam urutan ini:**

1. **Terminal 1:** ML API Service (port 5000)
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
   python ml_api_service.py
   ```

2. **Terminal 2:** Backend Server (port 3000)
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\backend"
   npm start
   ```

3. **Terminal 3:** Frontend (port 5173)
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\frontend"
   npm run dev
   ```

### ⚠️ Jangan Tutup Terminal

- **Terminal ML Service** harus tetap terbuka
- Jika ditutup, live detection tidak akan berfungsi
- Untuk stop: Tekan `CTRL+C` di terminal ML service

## 🎯 Quick Start Script

Untuk memudahkan, bisa buat file batch:

**`START_ML_SERVICE.bat`** (sudah ada di folder):
```batch
@echo off
cd /d "%~dp0"
python ml_api_service.py
pause
```

Double-click file tersebut untuk menjalankan ML service!

---

**Selamat! 🎉 Live Camera Detection siap digunakan!**

