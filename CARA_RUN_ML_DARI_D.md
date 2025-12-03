# 🚀 Cara Menjalankan ML Service dari Drive D:

## 🎯 Quick Start (Cara Termudah)

### **Cara 1: Double-Click File Batch** ⭐ (Paling Mudah)

1. Buka File Explorer
2. Navigate ke folder: `D:\RPL_Kelompok 4 - NOVA`
3. Double-click file: `JALANKAN_ML_SERVICE.bat`
4. ✅ Selesai! ML Service akan berjalan otomatis

---

### **Cara 2: Via Command Prompt**

**Buka Command Prompt:**

**Step 1:** Tekan `Windows + R`, ketik `cmd`, tekan Enter

**Step 2:** Ketik command berikut:

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**Tekan Enter**

---

## 📍 Lokasi File

**Workspace:**
```
D:\RPL_Kelompok 4 - NOVA
```

**ML Service:**
```
D:\RPL_Kelompok 4 - NOVA\machine learning\Project\ml_api_service.py
```

**Model YOLOv5_NEW:**
```
D:\RPL_Kelompok 4 - NOVA\machine learning\Project\yolov5_new\yolov5\runs\train\mushroom_custom\weights\best.pt
```

---

## ✅ Verifikasi ML Service Berjalan

### **Setelah menjalankan, di terminal HARUS muncul:**

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
======================================================================
🚀 ML Detection Service is starting...
======================================================================
📍 Service URL: http://localhost:5000
📍 Health check: http://localhost:5000/health
======================================================================
```

**✅ Jika muncul seperti ini** → ML Service berjalan dengan benar!

---

### **Test Health Check:**

Buka browser, ketik:
```
http://localhost:5000/health
```

**Harus muncul:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "...yolov5_new/.../best.pt"
}
```

---

## 🔗 Menghubungkan ke Dashboard Monitoring Petani

### **Perlu 3 Service Berjalan:**

#### **1️⃣ ML API Service (Port 5000)** ← Yang baru saja dijalankan
```
✅ Port: 5000
✅ URL: http://localhost:5000
✅ Health: http://localhost:5000/health
```

#### **2️⃣ Backend (Port 3000)**

**Buka Command Prompt baru:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

**Verifikasi:**
- Harus muncul: `Server running on port 3000`
- Test: `http://localhost:3000/api/ml/health`

---

#### **3️⃣ Frontend (Port 5173)**

**Buka Command Prompt baru lagi:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

**Verifikasi:**
- Harus muncul: `Local: http://localhost:5173`
- Buka: `http://localhost:5173`

---

## 📋 Urutan Menjalankan (3 Terminal)

### **Terminal 1: ML API Service** 🟢
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**Atau double-click:** `JALANKAN_ML_SERVICE.bat`

✅ Port: 5000

---

### **Terminal 2: Backend** 🔵
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

✅ Port: 3000

---

### **Terminal 3: Frontend** 🟡
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

✅ Port: 5173

---

## ✅ Checklist Koneksi

Sebelum menggunakan dashboard, pastikan:

- [ ] ✅ **ML Service berjalan** (port 5000)
  - Test: http://localhost:5000/health
  
- [ ] ✅ **Backend berjalan** (port 3000)
  - Test: http://localhost:3000/api/ml/health
  
- [ ] ✅ **Frontend berjalan** (port 5173)
  - Buka: http://localhost:5173

---

## 🎯 Menggunakan di Dashboard

### **Step 1: Buka Dashboard**
```
http://localhost:5173
```

### **Step 2: Login**
- Email: `petani2@gmail.com`
- Password: (password Anda)

### **Step 3: Buka Dashboard Monitoring**
- Klik menu **"Dashboard Monitoring"** atau **"Petani"**

### **Step 4: Aktifkan Live Camera**
1. Klik tombol **"Aktifkan Kamera"**
2. Setelah kamera muncul
3. Klik tombol **"Mulai Live Detection"**

---

## ⚠️ Troubleshooting

### **Error: "Python tidak ditemukan"**

**Solusi:**
1. Install Python 3.8+ dari python.org
2. Atau gunakan virtual environment

---

### **Error: "Model not found"**

**Cek:**
1. File model harus ada di: `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
2. Pastikan menjalankan dari folder: `machine learning/Project`

---

### **Error: "Port 5000 already in use"**

**Solusi:**
1. Cek apakah ada service lain di port 5000
2. Tutup service yang menggunakan port 5000
3. Atau ubah port di `ml_api_service.py`

---

### **Dashboard tidak bisa connect**

**Cek:**
1. ✅ ML Service berjalan? → Test: http://localhost:5000/health
2. ✅ Backend berjalan? → Test: http://localhost:3000/api/ml/health
3. ✅ Buka Browser Console (F12) untuk lihat error

---

## 💡 Tips

1. **Jangan tutup terminal ML Service** saat menggunakan dashboard
2. **Jalankan urut:** ML Service → Backend → Frontend
3. **Cek health check** sebelum menggunakan dashboard
4. **Gunakan file batch** (`JALANKAN_ML_SERVICE.bat`) untuk lebih mudah

---

## 📝 Command Quick Reference

### **Jalankan ML Service:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

**Atau:** Double-click `JALANKAN_ML_SERVICE.bat`

### **Jalankan Backend:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

### **Jalankan Frontend:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

---

## 🎉 Siap Digunakan!

**Setelah semua service berjalan:**
1. ✅ ML Service (port 5000)
2. ✅ Backend (port 3000)  
3. ✅ Frontend (port 5173)

**Buka dashboard:**
```
http://localhost:5173
```

**Selamat menggunakan!** 🚀

