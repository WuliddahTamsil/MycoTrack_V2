# ✅ Checklist: Cek Masalah Live Detection

## 🎯 Quick Check - 3 Menit

### ✅ **Check 1: ML Service Berjalan?**

Buka browser: `http://localhost:5000/health`

**Harus muncul:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "...yolov5_new/.../mushroom_custom/weights/best.pt"
}
```

✅ **Jika OK** → Lanjut ke Check 2
❌ **Jika ERROR** → Pastikan ML service berjalan:
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

---

### ✅ **Check 2: Backend → ML Service Connection?**

Buka browser: `http://localhost:3000/api/ml/health`

**Harus muncul:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

✅ **Jika OK** → Lanjut ke Check 3
❌ **Jika ERROR** → Backend tidak bisa hubungi ML service. Pastikan ML service berjalan di port 5000.

---

### ✅ **Check 3: Browser Console - Ada Error?**

1. Buka web monitoring petani
2. Aktifkan kamera
3. Aktifkan Live Detection
4. **Tekan F12** → Buka tab **Console**

**Cari log:**
```
[Live Detection] Sending frame to: ...
[Live Detection] Response status: 200
```

✅ **Jika ada log dan status 200** → Request berhasil, lanjut Check 4
❌ **Jika ada error** → Copy error message

---

### ✅ **Check 4: Terminal ML Service - Ada Log?**

**Lihat Terminal ML Service**, saat Live Detection aktif harus muncul:

```
[DETECT/UPLOAD] Running inference on image shape: ...
[DETECT/UPLOAD] Raw detections from model: X detections
```

✅ **Jika ada log** → ML service menerima request
❌ **Jika tidak ada log** → Request tidak sampai ke ML service

---

### ✅ **Check 5: Ada Deteksi tapi Tidak Ditampilkan?**

**Jika log menunjukkan:**
```
Raw detections from model: 0 detections
```

**Artinya:**
- ✅ Model bekerja
- ✅ Request sampai
- ❌ **Tapi tidak ada deteksi** (threshold atau gambar)

**Solusi:**
1. Coba dengan gambar yang jelas ada jamurnya
2. Atau turunkan threshold di `config.py`:
   ```python
   CONFIDENCE_THRESHOLD = 0.10  # Lebih rendah
   ```

---

## 🔧 Quick Fix

### Fix 1: Restart Semua Services

1. **Stop semua:**
   - Terminal ML Service: `CTRL+C`
   - Terminal Backend: `CTRL+C`
   - Terminal Frontend: `CTRL+C`

2. **Start lagi (urutan penting):**
   - **Terminal 1:** ML Service
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
   python ml_api_service.py
   ```
   
   - **Terminal 2:** Backend
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\backend"
   npm start
   ```
   
   - **Terminal 3:** Frontend
   ```cmd
   cd "D:\RPL_Kelompok 4 - NOVA\frontend"
   npm run dev
   ```

3. **Test lagi**

---

### Fix 2: Test dengan Upload Foto Dulu

1. Di web monitoring, **pilih mode "Upload Foto"**
2. Upload gambar jamur yang jelas
3. Klik **"Deteksi"**

**Jika ini berhasil:**
- ✅ ML service OK
- ✅ Model OK
- ⚠️ Masalah mungkin di live detection interval atau frame capture

**Jika ini juga gagal:**
- ❌ Masalah di ML service atau model
- Cek terminal ML service untuk error

---

### Fix 3: Cek Model Classes

**Dari terminal ML service, lihat:**
```
[INFO] Model classes: {0: 'Fase Muda', 1: 'Matang', 2: 'primordia'}
```

Model menggunakan kelas:
- `primordia` (lowercase)
- `Fase Muda`
- `Matang`

**Label mapping** di code sudah handle ini. Tapi jika masih tidak detect, mungkin:
- Confidence threshold perlu diturunkan
- Atau gambar tidak sesuai

---

## 📝 Yang Harus Dicek

1. ✅ **ML Service berjalan** (port 5000)
2. ✅ **Model path benar** (yolov5_new/.../best.pt)
3. ✅ **Backend berjalan** (port 3000)
4. ✅ **Frontend berjalan** (port 5173)
5. ✅ **Browser console tidak ada error**
6. ✅ **Network tab menunjukkan request berhasil**
7. ✅ **Terminal ML service menunjukkan log deteksi**

---

**Lakukan semua check di atas, lalu coba lagi!**

Jika masih tidak berfungsi, copy:
- Error dari Browser Console (F12)
- Log dari Terminal ML Service
- Log dari Terminal Backend

Dan kirimkan untuk debugging lebih lanjut.

