# 🔍 Cek Masalah: Live Detection Tidak Mendeteksi di Web

## ✅ Verifikasi Model

**Dari terminal output Anda:**
```
Model path: ...yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
Model classes: {0: 'Fase Muda', 1: 'Matang', 2: 'primordia'}
```

✅ **Model SUDAH menggunakan yolov5_new!**
✅ **Path sudah benar!**

---

## 🔍 Debugging Step-by-Step

### Step 1: Pastikan ML Service Berjalan

**Di Terminal ML Service, cek:**
```
✅ Model path: ...yolov5_new/.../best.pt
✅ Model loaded successfully!
✅ Service URL: http://localhost:5000
```

**Test di browser:**
```
http://localhost:5000/health
```

Harus return:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "...yolov5_new/.../best.pt"
}
```

---

### Step 2: Test Model Langsung

**Buka Terminal baru:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python TEST_MODEL_YOLOV5_NEW.py
```

Script ini akan test apakah model bisa di-load dan bekerja.

---

### Step 3: Cek Browser Console (F12)

1. Buka web monitoring
2. Tekan **F12** → Tab **Console**
3. Aktifkan Live Detection
4. **Lihat log yang muncul:**

**Harus ada:**
```
[Live Detection] Sending frame to: http://localhost:3000/api/ml/detect
[Live Detection] Blob size: ... bytes
[Live Detection] Response status: 200 OK
[Live Detection] Response data: {success: true, detectionsCount: ...}
```

**Jika ada error:**
- Copy error message
- Kemungkinan request tidak sampai atau ML service error

---

### Step 4: Cek Network Tab (F12)

1. Tekan **F12** → Tab **Network**
2. Filter: `detect`
3. Aktifkan Live Detection
4. **Klik request yang muncul**
5. Lihat tab **Response**

**Harus ada:**
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
- Model tidak menemukan jamur di frame
- Ini normal jika memang tidak ada jamur atau gambar tidak jelas

---

### Step 5: Cek Terminal ML Service

**Saat Live Detection aktif, HARUS muncul log:**

```
[DETECT/UPLOAD] Running inference on image shape: (480, 640, 3)
[DETECT/UPLOAD] Raw detections from model: X detections
```

**Jika muncul `Raw detections from model: 0 detections`:**
- ✅ Model bekerja (tidak error)
- ❌ Tapi tidak menemukan jamur
- **Solusi:** Coba dengan gambar yang jelas ada jamurnya

**Jika TIDAK ada log sama sekali:**
- ❌ Request tidak sampai ke ML service
- **Solusi:** Cek backend berjalan dan bisa hubungi ML service

---

## ❓ Kenapa Tidak Ada Deteksi?

### Kemungkinan 1: Model Tidak Mendeteksi (Paling Umum)

**Cek di Terminal ML Service:**
- Jika muncul: `Raw detections from model: 0 detections`
- **Artinya:** Model tidak menemukan jamur di frame

**Penyebab:**
- Tidak ada jamur di frame
- Jamur terlalu kecil/kabur
- Pencahayaan kurang
- Confidence threshold terlalu tinggi

**Solusi:**
1. **Coba dengan gambar yang jelas ada jamurnya** (test dengan upload foto dulu)
2. **Pastikan kamera fokus**
3. **Pastikan pencahayaan baik**
4. **Turunkan threshold** di `config.py`:
   ```python
   CONFIDENCE_THRESHOLD = 0.10  # Lebih rendah
   ```

---

### Kemungkinan 2: Request Tidak Sampai

**Cek Browser Console (F12):**
- Error: `Failed to fetch` atau `ECONNREFUSED`
- **Artinya:** Backend atau ML service tidak berjalan

**Solusi:**
1. Pastikan ML service berjalan (port 5000)
2. Pastikan backend berjalan (port 3000)
3. Restart semua services

---

### Kemungkinan 3: Response Tidak Ditampilkan

**Cek Network Tab (F12):**
- Status 200 OK
- Response ada `success: true`
- Tapi tidak ada bounding box muncul

**Kemungkinan:**
- `total_detections: 0` (tidak ada deteksi)
- Atau ada bug di frontend rendering

---

## 🎯 Quick Test

### Test 1: Upload Foto

1. Di web monitoring, pilih **"Upload Foto"**
2. Upload gambar jamur yang jelas
3. Klik **"Deteksi"**

**Jika ini berhasil:**
- ✅ ML service OK
- ✅ Model OK
- ✅ Model menggunakan yolov5_new
- ⚠️ Masalah hanya di live detection

**Jika ini juga gagal:**
- ❌ Masalah di ML service atau model
- Cek terminal ML service untuk error

---

### Test 2: Test Model Langsung

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python TEST_MODEL_YOLOV5_NEW.py
```

Script ini akan:
- ✅ Cek model file ada
- ✅ Load model
- ✅ Test deteksi
- ✅ Tampilkan model classes

---

## 📊 Checklist

- [ ] ML Service berjalan (port 5000)
- [ ] Model path menunjukkan `yolov5_new/.../best.pt` ✅
- [ ] Backend berjalan (port 3000)
- [ ] Browser console tidak ada error (F12)
- [ ] Network tab menunjukkan request 200 OK (F12)
- [ ] Terminal ML service menunjukkan log `[DETECT/UPLOAD]`
- [ ] Upload foto berhasil (test mode upload foto)

---

## 💡 Tips

1. **Test dengan Upload Foto dulu** untuk memastikan model bekerja
2. **Pastikan gambar jelas** dan ada jamur di dalamnya
3. **Cek terminal ML service** untuk melihat apakah ada deteksi (meskipun 0)
4. **Jika 0 detections**, turunkan threshold atau coba gambar lain

---

**Masih tidak berfungsi?** Kirimkan:
1. Screenshot Browser Console (F12)
2. Screenshot Network Tab (F12) - Response dari request `/api/ml/detect`
3. Log dari Terminal ML Service saat Live Detection aktif

