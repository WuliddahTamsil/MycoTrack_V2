# ✅ Verifikasi: Model YOLOv5_NEW & Debug Deteksi

## 🎯 Status Model

**Dari test command:**
```
✅ MODEL_PATH: ...yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
✅ File exists: True
```

**KESIMPULAN:** ✅ **Model SUDAH menggunakan yolov5_new!**

---

## 🔍 Cara Verifikasi Model yang Digunakan

### Test 1: Cek Model Path di ML Service

**Saat menjalankan ML service, di terminal HARUS muncul:**
```
Model path: D:\RPL_Kelompok 4 - NOVA\machine learning\Project\yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
```

**Jika masih menunjukkan `weights/best.pt`:**
- ❌ Model belum menggunakan yolov5_new
- **Solusi:** Pastikan menjalankan dari folder yang benar

---

### Test 2: Verifikasi dengan Script Test

**Buka Terminal:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python TEST_MODEL_YOLOV5_NEW.py
```

Script ini akan:
- ✅ Cek file model ada
- ✅ Load model
- ✅ Tampilkan model classes
- ✅ Test deteksi

---

## 🔧 Cara Menjalankan ML Service yang Benar

### ✅ Cara 1: Via Command Prompt (Recommended)

**Buka Command Prompt:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**PENTING:** 
- Harus dari folder `machine learning/Project`
- Jangan dari folder lain

---

### ✅ Cara 2: Via Batch File

**Double-click:**
```
machine learning/Project/start_ml_service.bat
```

---

### ✅ Cara 3: Langsung dari Explorer

1. Buka folder: `D:\RPL_Kelompok 4 - NOVA\machine learning\Project`
2. Shift + Right-click → "Open PowerShell window here"
3. Ketik: `python ml_api_service.py`

---

## 🐛 Debug: Kenapa Tidak Ada Deteksi?

### Problem 1: Model Tidak Mendeteksi

**Cek di Terminal ML Service:**
Saat Live Detection aktif, harus muncul:
```
[DETECT/UPLOAD] Running inference on image shape: (480, 640, 3)
[DETECT/UPLOAD] Raw detections from model: X detections
```

**Jika muncul `Raw detections from model: 0 detections`:**
- Model bekerja tapi tidak menemukan jamur
- **Kemungkinan:**
  - Confidence threshold terlalu tinggi (0.15)
  - Objek tidak jelas/tidak ada jamur
  - Gambar terlalu gelap

**Solusi:**
1. **Turunkan threshold** di `config.py`:
   ```python
   CONFIDENCE_THRESHOLD = 0.10  # Lebih rendah
   ```
   Lalu restart ML service

2. **Test dengan gambar yang jelas ada jamurnya**

---

### Problem 2: Request Tidak Sampai

**Cek Browser Console (F12):**
- Apakah ada log `[Live Detection] Sending frame...`?
- Apakah ada error?

**Jika tidak ada log:**
- Live detection tidak berjalan
- Atau ada error di JavaScript

**Solusi:**
- Refresh halaman
- Aktifkan Live Detection lagi

---

### Problem 3: Response Tidak Ditampilkan

**Cek Network Tab (F12):**
- Request status harus 200 OK
- Response harus ada `success: true`

**Jika response kosong atau error:**
- Cek terminal ML service untuk error
- Cek terminal backend untuk error

---

## 📋 Checklist Lengkap

- [ ] ✅ Model path di config.py menunjukkan `yolov5_new/.../best.pt`
- [ ] ✅ File model ada di folder tersebut
- [ ] ✅ ML Service dijalankan dari folder `machine learning/Project`
- [ ] ✅ Terminal ML Service menunjukkan model path yang benar
- [ ] ✅ Backend berjalan (port 3000)
- [ ] ✅ Frontend berjalan (port 5173)
- [ ] ✅ Browser console tidak ada error (F12)
- [ ] ✅ Network tab menunjukkan request 200 OK (F12)
- [ ] ✅ Terminal ML Service menunjukkan log saat detection

---

## 🎯 Langkah Perbaikan

### Step 1: Restart ML Service dengan Model Baru

1. **Stop ML Service** (CTRL+C di terminal)
2. **Pastikan config.py sudah benar:**
   ```python
   MODEL_PATH = ...yolov5_new/.../best.pt
   ```
3. **Start lagi:**
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
   python ml_api_service.py
   ```
4. **Cek output:** Harus menunjukkan path ke yolov5_new

---

### Step 2: Turunkan Confidence Threshold

Edit `config.py`:
```python
CONFIDENCE_THRESHOLD = 0.10  # Turun dari 0.15 ke 0.10
```

Restart ML service.

---

### Step 3: Test dengan Upload Foto

1. Di web, pilih mode "Upload Foto"
2. Upload gambar jamur yang jelas
3. Klik "Deteksi"

**Jika ini berhasil:**
- ✅ Model OK
- ✅ ML service OK
- ⚠️ Masalah hanya di live detection

---

## 💡 Tips

1. **Jalankan ML Service dari folder yang benar** (`machine learning/Project`)
2. **Cek terminal output** saat start - harus menunjukkan path ke yolov5_new
3. **Test dengan Upload Foto dulu** untuk memastikan model bekerja
4. **Cek Browser Console (F12)** untuk melihat error

---

**Model sudah benar menggunakan yolov5_new!** ✅

Jika masih tidak ada deteksi, kemungkinan besar masalahnya di:
- Confidence threshold terlalu tinggi
- Atau request tidak sampai ke ML service

