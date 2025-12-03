# 🚀 Cara Menjalankan Semua Services untuk Live Camera Detection

## ⚡ Quick Start - 3 Terminal

Jalankan **3 terminal/command prompt** secara bersamaan:

### Terminal 1: ML API Service (Port 5000)
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**ATAU double-click:**
```
machine learning/Project/start_ml_service.bat
```

**Cek berhasil:** Buka browser → `http://localhost:5000/health`
- Harus muncul: `{"status":"healthy","model_loaded":true}`
- Model path harus menunjukkan: `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`

---

### Terminal 2: Backend Server (Port 3000)
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

**Cek berhasil:** Buka browser → `http://localhost:3000/api/ml/health`
- Harus muncul: `{"status":"healthy","model_loaded":true}`

---

### Terminal 3: Frontend (Port 5173)
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

**Cek berhasil:** Buka browser → `http://localhost:5173`
- Website harus terbuka

---

## ✅ Verifikasi Model yang Digunakan

**Di Terminal 1 (ML Service), cek output:**
```
Model path: D:\RPL_Kelompok 4 - NOVA\machine learning\Project\yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
```

Jika masih menunjukkan path ke `weights/best.pt`, berarti:
1. File `config.py` belum ter-update, atau
2. Model dari yolov5_new tidak ditemukan

**Solusi:** Pastikan file ada di:
```
machine learning/Project/yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
```

---

## 🎥 Cara Menggunakan Live Camera

1. Buka browser: `http://localhost:5173/dashboard`
2. Login sebagai Petani
3. Klik "Dashboard Monitoring"
4. Pilih mode **"Live Camera"** (tombol merah)
5. Klik **"Aktifkan Kamera Laptop"**
6. Klik **"Mulai Live Detection"** (tombol hijau)
7. Arahkan kamera ke jamur

**Hasil:**
- ✅ Video kamera muncul
- ✅ Bounding box muncul otomatis
- ✅ Label fase (Primordia/Muda/Matang) muncul
- ✅ FPS counter di pojok kiri atas
- ✅ Info panel di pojok kanan atas

---

## ❌ Troubleshooting

### Tidak Ada Deteksi?

1. **Cek Terminal 1 (ML Service)**
   - Harus ada log: `[DETECT] Running inference...`
   - Jika tidak ada, berarti request tidak sampai

2. **Cek Browser Console (F12)**
   - Buka tab Console
   - Lihat apakah ada error
   - Error umum: "Failed to fetch" → ML service tidak berjalan

3. **Cek Model Path**
   - Di Terminal 1, cek path model yang digunakan
   - Harus: `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`

4. **Cek Network Tab (F12)**
   - Request ke `/api/ml/detect` harus success (200)
   - Jika error 500 → ML service error
   - Jika error 404 → Backend tidak bisa hubungi ML service

### ML Service Tidak Start?

1. **Install dependencies:**
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
   pip install -r requirements_ml_api.txt
   ```

2. **Port 5000 sudah digunakan:**
   ```cmd
   taskkill /F /IM python.exe
   ```
   Lalu jalankan lagi ML service

---

## 📝 Catatan Penting

- ⚠️ **JANGAN TUTUP Terminal 1** saat menggunakan live camera!
- ⚠️ **ML Service HARUS berjalan** untuk live detection bekerja
- ✅ Model sudah dikonfigurasi untuk menggunakan `yolov5_new`
- ✅ Urutan: ML Service → Backend → Frontend

---

**Masih ada masalah?** Cek file: `machine learning/Project/CARA_JALANKAN_ML_SERVICE.md` untuk detail lengkap!

