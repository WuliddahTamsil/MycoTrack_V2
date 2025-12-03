# 🚀 Cara Menjalankan ML Service & Verifikasi Model YOLOv5_NEW

## ✅ Pastikan Model YOLOv5_NEW Digunakan

### Step 1: Cek Config.py

Buka file: `machine learning/Project/config.py`

**Harus ada baris ini (baris 17):**
```python
MODEL_PATH = str(PROJECT_ROOT / "yolov5_new" / "yolov5" / "runs" / "train" / "mushroom_custom" / "weights" / "best.pt")
```

✅ **Jika sudah ada** → Lanjut ke Step 2
❌ **Jika masih `weights/best.pt`** → File config belum ter-update, hubungi tim untuk update

---

### Step 2: Cara Menjalankan ML Service

**Buka Command Prompt/PowerShell:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**⚠️ PENTING:** 
- Harus dari folder `machine learning/Project`
- Jangan dari folder lain

---

### Step 3: Verifikasi Model Path di Terminal

**Saat ML Service start, di terminal HARUS muncul:**
```
======================================================================
ML Detection API Service
======================================================================
Model path: D:\RPL_Kelompok 4 - NOVA\machine learning\Project\yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
Confidence threshold: 0.10
======================================================================
[INFO] Loading model: ...yolov5_new/.../best.pt
[INFO] Model loaded successfully!
[INFO] Model classes: {0: 'Fase Muda', 1: 'Matang', 2: 'primordia'}
```

**✅ Jika path menunjukkan `yolov5_new/.../best.pt`** → Model sudah benar!

**❌ Jika masih menunjukkan `weights/best.pt`** → Ada masalah, cek config.py lagi

---

### Step 4: Test Health Check

**Buka browser:**
```
http://localhost:5000/health
```

**Harus return:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "...yolov5_new/.../best.pt"
}
```

---

## 🔍 Debug: Kenapa Tidak Ada Deteksi?

### Cek 1: Terminal ML Service

**Saat Live Detection aktif, HARUS muncul log:**
```
[DETECT/UPLOAD] Running inference on image shape: (480, 640, 3)
[DETECT/UPLOAD] Raw detections from model: X detections
```

**Jika muncul `Raw detections from model: 0 detections`:**
- ✅ Model bekerja (tidak error)
- ❌ Tapi tidak menemukan jamur
- **Kemungkinan:**
  - Confidence threshold terlalu tinggi
  - Gambar tidak jelas
  - Tidak ada jamur di frame

**Solusi:**
- Threshold sudah diturunkan ke 0.10 (lebih sensitif)
- Coba dengan gambar yang lebih jelas
- Pastikan ada jamur di frame

---

### Cek 2: Browser Console (F12)

1. Buka web monitoring
2. Tekan **F12** → Tab **Console**
3. Aktifkan Live Detection
4. **Lihat log:**

**Harus muncul:**
```
[Live Detection] Sending frame to: http://localhost:3000/api/ml/detect
[Live Detection] Response status: 200
[Live Detection] Response data: {success: true, detectionsCount: ...}
```

**Jika ada error:**
- Copy error message
- Kemungkinan request tidak sampai atau ML service error

---

### Cek 3: Network Tab (F12)

1. Tekan **F12** → Tab **Network**
2. Filter: `detect`
3. Aktifkan Live Detection
4. Klik request yang muncul
5. Lihat tab **Response**

**Harus ada:**
```json
{
  "success": true,
  "detections": [...],
  "summary": {...},
  "total_detections": ...
}
```

---

## 🎯 Quick Fix Checklist

- [ ] ✅ ML Service dijalankan dari folder `machine learning/Project`
- [ ] ✅ Terminal menunjukkan model path ke `yolov5_new/.../best.pt`
- [ ] ✅ Backend berjalan (port 3000)
- [ ] ✅ Frontend berjalan (port 5173)
- [ ] ✅ Browser console tidak ada error (F12)
- [ ] ✅ Network tab menunjukkan request 200 OK (F12)
- [ ] ✅ Terminal ML Service menunjukkan log saat detection
- [ ] ✅ Confidence threshold sudah 0.10 (lebih sensitif)

---

## 💡 Tips

1. **Jalankan ML Service dari folder yang benar** - `machine learning/Project`
2. **Cek terminal output** saat start - harus menunjukkan path ke yolov5_new
3. **Test dengan Upload Foto** dulu untuk memastikan model bekerja
4. **Cek Browser Console (F12)** untuk melihat error atau log

---

**Model sudah menggunakan yolov5_new!** ✅

Sekarang coba lagi dengan threshold yang lebih rendah (0.10). Jika masih tidak detect, kemungkinan:
- Gambar tidak jelas
- Atau memang tidak ada jamur yang terdeteksi oleh model

