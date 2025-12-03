# ⚡ Quick Fix: Live Detection Tidak Bekerja

## 🎯 Pastikan 3 Services Berjalan

### ✅ Service 1: ML API Service (Port 5000)
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**Cek:** Buka `http://localhost:5000/health`
- Harus: `{"status":"healthy","model_loaded":true}`
- **Model path harus:** `...yolov5_new/.../mushroom_custom/weights/best.pt`

---

### ✅ Service 2: Backend (Port 3000)
```cmd
cd backend
npm start
```

**Cek:** Buka `http://localhost:3000/api/ml/health`
- Harus: `{"status":"healthy","model_loaded":true}`

---

### ✅ Service 3: Frontend (Port 5173)
```cmd
cd frontend
npm run dev
```

**Cek:** Buka `http://localhost:5173`

---

## 🔍 Debug Langkah-Langkah

### Step 1: Buka Browser Console (F12)

1. Buka web monitoring
2. Tekan **F12** → Tab **Console**
3. Aktifkan kamera
4. Aktifkan Live Detection

**Harus muncul log:**
```
[Live Detection] Sending frame to: http://localhost:3000/api/ml/detect
[Live Detection] Blob size: ... bytes
[Live Detection] Response status: 200 OK
```

---

### Step 2: Cek Network Tab (F12)

1. Tekan **F12** → Tab **Network**
2. Filter: `detect`
3. Klik request yang muncul
4. Lihat **Response** tab

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

### Step 3: Cek Terminal ML Service

**Harus muncul log setiap deteksi:**
```
[DETECT/UPLOAD] Running inference on image shape: ...
[DETECT/UPLOAD] Raw detections from model: X detections
```

**Jika `Raw detections from model: 0 detections`:**
- Model tidak menemukan apapun
- Coba dengan gambar yang jelas ada jamurnya
- Atau turunkan threshold di `config.py`

---

## 🎯 Model Sudah Benar!

Dari terminal output Anda:
```
Model path: ...yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
Model classes: {0: 'Fase Muda', 1: 'Matang', 2: 'primordia'}
```

✅ **Model sudah menggunakan yolov5_new!**
✅ **Path sudah benar!**

---

## ❓ Kenapa Tidak Ada Deteksi?

### Kemungkinan 1: Model Tidak Mendeteksi

**Cek di Terminal ML Service:**
- Jika muncul: `Raw detections from model: 0 detections`
- **Artinya:** Model tidak menemukan jamur di frame

**Solusi:**
- Coba dengan gambar yang jelas ada jamurnya
- Pastikan kamera fokus
- Pastikan pencahayaan baik

---

### Kemungkinan 2: Request Tidak Sampai

**Cek Browser Console (F12):**
- Jika ada error: `Failed to fetch` atau `ECONNREFUSED`
- **Artinya:** Backend atau ML service tidak berjalan

**Solusi:**
- Pastikan ML service berjalan
- Pastikan backend berjalan
- Restart semua services

---

### Kemungkinan 3: Response Tidak Ditampilkan

**Cek Network Tab (F12):**
- Jika status 200 tapi tidak ada deteksi
- **Artinya:** Response kosong (tidak ada deteksi)

**Solusi:**
- Cek log di Terminal ML Service
- Lihat apakah `Raw detections from model: 0`

---

## 🔧 Quick Test

### Test 1: Upload Foto
1. Pilih mode **"Upload Foto"**
2. Upload gambar jamur yang jelas
3. Klik **"Deteksi"**

**Jika ini berhasil:**
- ✅ ML service OK
- ✅ Model OK
- ⚠️ Masalah di live detection

**Jika ini juga gagal:**
- ❌ Masalah di ML service atau model
- Cek terminal ML service untuk error

---

## 📝 Checklist Final

- [ ] ML Service berjalan (port 5000)
- [ ] Model path menunjukkan `yolov5_new/.../best.pt` ✅ (sudah benar!)
- [ ] Backend berjalan (port 3000)
- [ ] Frontend berjalan (port 5173)
- [ ] Browser console tidak ada error (F12)
- [ ] Network tab menunjukkan request 200 OK (F12)
- [ ] Terminal ML service menunjukkan log `[DETECT/UPLOAD]`

---

**Setelah semua checklist ✅, coba lagi!**

Jika masih tidak ada deteksi, kemungkinan:
- Gambar tidak ada jamur
- Threshold perlu diturunkan
- Atau model perlu gambar yang lebih jelas

