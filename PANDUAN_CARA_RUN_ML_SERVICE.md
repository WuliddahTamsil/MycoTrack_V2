# 🚀 PANDUAN: Cara Menjalankan ML Service YOLOv5_NEW

## ⭐ Cara Termudah (1 Klik)

### **Double-Click File Batch:**

1. Buka folder: `D:\RPL_Kelompok 4 - NOVA`
2. Double-click file: **`JALANKAN_ML_SERVICE.bat`**
3. ✅ Selesai! ML Service akan berjalan otomatis

---

## 📝 Cara Manual (Via Command Prompt)

### **Step 1: Buka Command Prompt**

Tekan `Windows + R`, ketik `cmd`, tekan Enter

---

### **Step 2: Navigate ke Folder ML Service**

Copy dan paste command ini:

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
```

Tekan Enter

---

### **Step 3: Jalankan ML Service**

Copy dan paste command ini:

```cmd
python ml_api_service.py
```

Tekan Enter

---

### **Step 4: Verifikasi**

**Di terminal, HARUS muncul:**

```
Model path: ...yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
[INFO] Model loaded successfully!
📍 Service URL: http://localhost:5000
```

✅ **Jika muncul seperti ini** → Berhasil!

---

## ✅ Test ML Service

**Buka browser, ketik:**

```
http://localhost:5000/health
```

**Harus muncul:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

---

## 🔗 Hubungkan ke Dashboard Monitoring Petani

### **Perlu 3 Service Berjalan Bersama:**

#### **1️⃣ ML API Service (Port 5000)** 🟢

**Cara 1: Double-click**
- File: `JALANKAN_ML_SERVICE.bat`

**Cara 2: Command Prompt**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

✅ Test: http://localhost:5000/health

---

#### **2️⃣ Backend (Port 3000)** 🔵

**Buka Command Prompt baru:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

✅ Test: http://localhost:3000/api/ml/health

---

#### **3️⃣ Frontend (Port 5173)** 🟡

**Buka Command Prompt baru lagi:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

✅ Buka: http://localhost:5173

---

## 📋 Checklist

Sebelum menggunakan dashboard:

- [ ] ✅ ML Service berjalan (port 5000)
  - Test: http://localhost:5000/health
  
- [ ] ✅ Backend berjalan (port 3000)
  - Test: http://localhost:3000/api/ml/health
  
- [ ] ✅ Frontend berjalan (port 5173)
  - Buka: http://localhost:5173

---

## 🎯 Menggunakan Dashboard

1. **Buka:** http://localhost:5173
2. **Login** sebagai petani
3. **Klik** "Dashboard Monitoring"
4. **Klik** "Aktifkan Kamera"
5. **Klik** "Mulai Live Detection"

---

## 💡 Tips

- ✅ Jangan tutup terminal ML Service saat menggunakan dashboard
- ✅ Jalankan urut: ML Service → Backend → Frontend
- ✅ Gunakan file batch (`JALANKAN_ML_SERVICE.bat`) untuk lebih mudah

---

**Siap digunakan!** 🎉

