# 🔍 Troubleshooting Live Detection Tidak Bekerja

## ✅ Verifikasi Langkah-Langkah

### 1. **Cek ML Service Berjalan**

**Di Terminal ML Service, pastikan:**
```
✅ Model path: ...yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
✅ Model loaded successfully!
✅ Service URL: http://localhost:5000
```

**Test di browser:**
```
http://localhost:5000/health
```
Harus return: `{"status":"healthy","model_loaded":true}`

---

### 2. **Cek Backend Berjalan**

**Test di browser:**
```
http://localhost:3000/api/ml/health
```
Harus return: `{"status":"healthy","model_loaded":true}`

---

### 3. **Cek Browser Console (F12)**

**Buka Developer Tools (F12) → Tab Console:**

Saat Live Detection aktif, harus muncul log:
```
[Live Detection] Sending frame to: http://localhost:3000/api/ml/detect
[Live Detection] Blob size: ... bytes
[Live Detection] Response status: 200 OK
[Live Detection] Response data: {success: true, detectionsCount: ...}
```

**Jika ada error:**
- ❌ `Failed to fetch` → ML service atau backend tidak berjalan
- ❌ `404` → Endpoint salah
- ❌ `500` → Error di ML service (cek terminal ML service)

---

### 4. **Cek Network Tab (F12)**

**Buka Developer Tools (F12) → Tab Network:**

1. Filter: `detect`
2. Klik salah satu request
3. Cek:
   - **Status:** Harus `200 OK`
   - **Request URL:** Harus `http://localhost:3000/api/ml/detect`
   - **Response:** Harus ada `success: true`

---

### 5. **Cek Terminal ML Service**

**Saat Live Detection berjalan, harus muncul log:**

```
[DETECT/UPLOAD] Running inference on image shape: (480, 640, 3)
[DETECT/UPLOAD] Raw detections from model: X detections
[DETECT/UPLOAD] Processing: primordia -> Primordia, conf: 0.XXX
[DETECT/UPLOAD] Processed X detections
[DETECT/UPLOAD] Summary: {'Primordia': X, 'Muda': Y, 'Matang': Z}
```

**Jika tidak ada log:**
- ❌ Request tidak sampai ke ML service
- ❌ Cek koneksi backend → ML service

---

## 🔧 Masalah Umum & Solusi

### ❌ **Tidak Ada Deteksi (No Detections)**

**Kemungkinan penyebab:**
1. **Model tidak mendeteksi apapun** (threshold terlalu tinggi)
2. **Gambar tidak sesuai** (tidak ada jamur di frame)
3. **Model belum terlatih dengan baik**

**Solusi:**
1. Cek terminal ML service - apakah ada log `Raw detections from model: 0 detections`?
2. Coba dengan gambar yang jelas ada jamurnya
3. Cek confidence threshold di `config.py` (sekarang 0.15 - sudah rendah)

**Test dengan gambar statis:**
- Coba mode "Upload Foto" dulu
- Jika upload foto bisa detect, berarti model OK
- Jika upload foto juga tidak detect, kemungkinan:
  - Gambar tidak ada jamur
  - Threshold perlu diturunkan lagi

---

### ❌ **Request Tidak Sampai ke ML Service**

**Cek di Terminal Backend:**
Harus ada log:
```
[ML DETECT] Received detection request
[ML DETECT] Has file: true
[ML DETECT] Sending to ML service: http://localhost:5000/detect/upload
[ML DETECT] ML service responded successfully
```

**Jika tidak ada log:**
- Backend tidak menerima request
- Cek CORS settings
- Cek URL endpoint di frontend

---

### ❌ **Error di ML Service**

**Cek Terminal ML Service untuk error:**
```
Error in detection: ...
```

**Solusi:**
- Copy error message
- Cek apakah model file corrupt
- Restart ML service

---

### ❌ **Deteksi Lambat/Timeout**

**Kemungkinan:**
- Model terlalu besar
- CPU tidak cukup cepat
- Terlalu banyak request sekaligus

**Solusi:**
- Tunggu beberapa detik untuk deteksi pertama (model loading)
- Kurangi interval deteksi (ubah dari 500ms ke 1000ms)

---

## 📊 Debug Checklist

- [ ] ML Service berjalan di port 5000
- [ ] Backend berjalan di port 3000
- [ ] Frontend berjalan di port 5173
- [ ] Model path menunjukkan ke `yolov5_new/.../mushroom_custom/weights/best.pt`
- [ ] Browser console tidak ada error
- [ ] Network tab menunjukkan request berhasil (200 OK)
- [ ] Terminal ML service menunjukkan log deteksi
- [ ] Terminal backend menunjukkan log forwarding request
- [ ] Kamera sudah diaktifkan
- [ ] Live Detection sudah diaktifkan

---

## 🔍 Step-by-Step Debugging

### Step 1: Test ML Service Langsung

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

### Step 2: Test Backend → ML Service

**Buka browser:**
```
http://localhost:3000/api/ml/health
```

**Harus return:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

---

### Step 3: Test dengan Upload Foto

1. Di web monitoring, pilih mode **"Upload Foto"**
2. Upload gambar jamur
3. Klik **"Deteksi"**
4. **Jika ini berhasil**, berarti ML service OK
5. **Jika ini juga gagal**, berarti masalah di ML service

---

### Step 4: Test Live Detection

1. Aktifkan kamera
2. Aktifkan Live Detection
3. **Buka Browser Console (F12)**
4. Lihat log:
   - `[Live Detection] Sending frame to: ...`
   - `[Live Detection] Response status: 200`
   - `[Live Detection] Response data: ...`

5. **Buka Network Tab (F12)**
   - Filter: `detect`
   - Klik request
   - Lihat Response

6. **Cek Terminal ML Service**
   - Harus ada log `[DETECT/UPLOAD]`

---

## 💡 Tips

- ✅ **Gunakan gambar yang jelas ada jamurnya** untuk test
- ✅ **Pastikan pencahayaan baik** saat live camera
- ✅ **Tunggu beberapa detik** setelah aktifkan Live Detection (untuk deteksi pertama)
- ✅ **Cek semua terminal** (ML Service, Backend, Frontend) untuk error

---

**Masih tidak berfungsi?** Copy error message dari:
1. Browser Console (F12)
2. Terminal ML Service
3. Terminal Backend

Dan kirimkan untuk debugging lebih lanjut!

