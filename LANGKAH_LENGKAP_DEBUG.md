# 📋 Langkah Lengkap Debug: Live Detection Tidak Bekerja

## 🎯 Ringkasan Masalah

**Masalah:** Live camera tidak mendeteksi apapun meskipun ada objek di frame
**Model:** ✅ Sudah menggunakan yolov5_new (diverifikasi)
**Status:** Perlu debugging lebih lanjut

---

## ✅ Langkah 1: Verifikasi Cara Menjalankan ML Service

### Cara Menjalankan yang Benar:

**Buka Command Prompt/PowerShell:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**⚠️ PENTING:**
- Harus dari folder `machine learning/Project`
- Jangan lompat folder atau dari tempat lain

**Verifikasi di Terminal:**
Saat start, harus muncul:
```
Model path: ...yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
```

✅ **Jika path menunjukkan `yolov5_new`** → Model sudah benar!
❌ **Jika masih `weights/best.pt`** → Ada masalah

---

## ✅ Langkah 2: Cek Semua Service Berjalan

### Service 1: ML API Service (Port 5000)
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**Test:** Buka `http://localhost:5000/health`
- Harus: `{"status":"healthy","model_loaded":true}`

---

### Service 2: Backend (Port 3000)
```cmd
cd backend
npm start
```

**Test:** Buka `http://localhost:3000/api/ml/health`
- Harus: `{"status":"healthy","model_loaded":true}`

---

### Service 3: Frontend (Port 5173)
```cmd
cd frontend
npm run dev
```

**Test:** Buka `http://localhost:5173`

---

## ✅ Langkah 3: Debug Live Detection

### A. Buka Browser Console (F12)

1. Buka web monitoring petani
2. Tekan **F12** → Tab **Console**
3. Aktifkan Live Detection
4. **Lihat log yang muncul**

**Harus muncul:**
```
[Live Detection] Sending frame to: http://localhost:3000/api/ml/detect
[Live Detection] Blob size: ... bytes
[Live Detection] Response status: 200 OK
[Live Detection] Response data: {...}
```

**Jika ada error:**
- Copy error message
- Screenshot console

---

### B. Buka Network Tab (F12)

1. Tekan **F12** → Tab **Network**
2. Filter: `detect`
3. Aktifkan Live Detection
4. **Klik request yang muncul**
5. Lihat tab **Response**

**Harus ada response dengan format:**
```json
{
  "success": true,
  "detections": [...],
  "summary": {
    "Primordia": 0,
    "Muda": 0,
    "Matang": 0
  },
  "total_detections": 0
}
```

**Jika `total_detections: 0`:**
- Model tidak menemukan jamur (normal jika memang tidak ada)
- Atau threshold perlu diturunkan lagi

---

### C. Cek Terminal ML Service

**Saat Live Detection aktif, HARUS muncul log setiap deteksi:**

```
[DETECT/UPLOAD] Running inference on image shape: (480, 640, 3)
[DETECT/UPLOAD] Raw detections from model: X detections
```

**Jika muncul `Raw detections from model: 0 detections`:**
- ✅ Model bekerja
- ❌ Tidak menemukan jamur
- **Coba dengan gambar yang lebih jelas**

**Jika TIDAK ADA LOG sama sekali:**
- ❌ Request tidak sampai ke ML service
- **Solusi:** Cek backend bisa hubungi ML service

---

## 🔧 Perbaikan yang Sudah Dilakukan

1. ✅ **Threshold diturunkan:** 0.15 → 0.10 (lebih sensitif)
2. ✅ **Logging diperbaiki:** Log lebih detail di frontend dan backend
3. ✅ **Model path sudah benar:** Menggunakan yolov5_new
4. ✅ **Label mapping sudah ada:** Handle 'primordia' dan 'Fase Muda'

---

## 🎯 Langkah Perbaikan

### Fix 1: Restart ML Service

**Pastikan menggunakan model baru:**

1. **Stop ML Service** (CTRL+C)
2. **Cek config.py** - pastikan path ke yolov5_new
3. **Start lagi:**
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
   python ml_api_service.py
   ```
4. **Cek output:** Harus menunjukkan path ke yolov5_new

---

### Fix 2: Test dengan Upload Foto

**Untuk memastikan model bekerja:**

1. Di web monitoring, pilih mode **"Upload Foto"**
2. Upload gambar jamur yang jelas dan besar
3. Klik **"Deteksi"**

**Hasil:**
- ✅ Jika berhasil → Model OK, masalah hanya di live detection
- ❌ Jika gagal → Masalah di ML service atau model

---

### Fix 3: Cek Confidence Threshold

**Saat ini sudah diturunkan ke 0.10** (lebih sensitif)

Jika masih tidak detect, bisa turunkan lagi di `config.py`:
```python
CONFIDENCE_THRESHOLD = 0.05  # Sangat rendah
```

**Lalu restart ML Service**

---

## 📊 Checklist Final

- [ ] ML Service berjalan dari folder `machine learning/Project`
- [ ] Terminal ML Service menunjukkan path ke `yolov5_new/.../best.pt` ✅
- [ ] Backend berjalan (port 3000)
- [ ] Frontend berjalan (port 5173)
- [ ] Browser console tidak ada error (F12)
- [ ] Network tab menunjukkan request 200 OK (F12)
- [ ] Terminal ML Service menunjukkan log saat detection
- [ ] Threshold sudah 0.10 (lebih sensitif)

---

## 💡 Tips

1. **Test dengan Upload Foto dulu** - pastikan model bekerja
2. **Gunakan gambar yang jelas** - jamur harus jelas terlihat
3. **Pastikan pencahayaan baik** - jangan terlalu gelap
4. **Cek semua terminal** untuk error

---

**Model sudah benar menggunakan yolov5_new!** ✅

Jika masih tidak ada deteksi setelah semua checklist, kirimkan:
1. Screenshot Browser Console (F12)
2. Screenshot Network Tab - Response dari request `/api/ml/detect`
3. Log dari Terminal ML Service saat Live Detection aktif

