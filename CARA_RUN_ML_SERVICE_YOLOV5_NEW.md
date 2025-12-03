# 🚀 Cara Menjalankan ML Service YOLOv5_NEW di Terminal

## 📍 Lokasi Folder

**Workspace Anda:**
```
D:\RPL_Kelompok 4 - NOVA
```

**Folder ML Service:**
```
D:\RPL_Kelompok 4 - NOVA\machine learning\Project
```

---

## 🎯 Cara Menjalankan ML Service (Step-by-Step)

### **Step 1: Buka Command Prompt atau PowerShell**

**Cara 1: Via Run (Windows + R)**
1. Tekan `Windows + R`
2. Ketik: `cmd` atau `powershell`
3. Tekan Enter

**Cara 2: Via File Explorer**
1. Buka File Explorer
2. Navigate ke: `D:\RPL_Kelompok 4 - NOVA\machine learning\Project`
3. Klik di address bar
4. Ketik: `cmd` atau `powershell`
5. Tekan Enter

---

### **Step 2: Navigate ke Folder ML Service**

**Di Command Prompt, ketik:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
```

**Tekan Enter**

**Verifikasi:**
Anda harus melihat prompt seperti ini:
```
D:\RPL_Kelompok 4 - NOVA\machine learning\Project>
```

---

### **Step 3: Jalankan ML Service**

**Ketikan command:**

```cmd
python ml_api_service.py
```

**Tekan Enter**

---

### **Step 4: Verifikasi ML Service Berjalan**

**Di terminal, harus muncul:**

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
[INFO] Model loaded successfully!
======================================================================
🚀 ML Detection Service is starting...
======================================================================
📍 Service URL: http://localhost:5000
📍 Health check: http://localhost:5000/health
======================================================================

⚠️  IMPORTANT: Keep this window open while using detection feature!
   Press CTRL+C to stop the service

======================================================================
```

**✅ Jika muncul seperti ini** → ML Service berjalan dengan benar!

**❌ Jika ada error** → Cek error message di terminal

---

### **Step 5: Test Health Check**

**Buka browser baru, ketik di address bar:**

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

**✅ Jika muncul seperti ini** → ML Service siap digunakan!

---

## 🔗 Menghubungkan ke Dashboard Monitoring Petani

### **Pastikan 3 Service Berjalan:**

#### **1. ML API Service (Port 5000)** ← Yang baru saja dijalankan
```
✅ Terminal ML Service: python ml_api_service.py
✅ Test: http://localhost:5000/health
```

#### **2. Backend (Port 3000)**

**Buka Terminal/Command Prompt baru:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```

**Verifikasi:**
- Harus menunjukkan: `Server running on port 3000`
- Test: `http://localhost:3000/api/ml/health`

---

#### **3. Frontend (Port 5173)**

**Buka Terminal/Command Prompt baru lagi:**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```

**Verifikasi:**
- Harus menunjukkan: `Local: http://localhost:5173`
- Buka: `http://localhost:5173`

---

## 📋 Urutan Menjalankan (3 Terminal)

### **Terminal 1: ML API Service**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```
✅ Port: 5000
✅ Test: http://localhost:5000/health

---

### **Terminal 2: Backend**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```
✅ Port: 3000
✅ Test: http://localhost:3000/api/ml/health

---

### **Terminal 3: Frontend**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\frontend"
npm run dev
```
✅ Port: 5173
✅ Buka: http://localhost:5173

---

## ✅ Checklist Koneksi

- [ ] ✅ ML Service berjalan (port 5000)
- [ ] ✅ Backend berjalan (port 3000)
- [ ] ✅ Frontend berjalan (port 5173)
- [ ] ✅ Health check ML Service OK: http://localhost:5000/health
- [ ] ✅ Health check Backend OK: http://localhost:3000/api/ml/health
- [ ] ✅ Dashboard bisa dibuka: http://localhost:5173

---

## 🎯 Menggunakan di Dashboard Monitoring Petani

### **Step 1: Buka Dashboard**
```
http://localhost:5173
```

### **Step 2: Login sebagai Petani**
- Email: `petani2@gmail.com`
- Password: (password Anda)

### **Step 3: Buka Dashboard Monitoring**
- Klik menu "Dashboard Monitoring"

### **Step 4: Aktifkan Live Camera**
- Klik "Aktifkan Kamera"
- Setelah kamera muncul, klik "Mulai Live Detection"

---

## ⚠️ Troubleshooting

### **Error: "Module not found" atau "No module named"**

**Solusi:**
```cmd
pip install torch torchvision opencv-python flask flask-cors pandas numpy pillow
```

---

### **Error: "Model not found"**

**Cek:**
1. Pastikan file ada di: `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
2. Pastikan menjalankan dari folder: `machine learning/Project`

---

### **Error: "Port 5000 already in use"**

**Solusi:**
1. Cek apakah ada service lain di port 5000
2. Atau ubah port di `ml_api_service.py`

---

### **Dashboard tidak bisa connect ke ML Service**

**Cek:**
1. ✅ ML Service berjalan? (http://localhost:5000/health)
2. ✅ Backend berjalan? (http://localhost:3000/api/ml/health)
3. ✅ Cek Browser Console (F12) untuk error

---

## 💡 Tips

1. **Jangan tutup terminal ML Service** saat menggunakan dashboard
2. **Jalankan urut:** ML Service → Backend → Frontend
3. **Cek health check** sebelum menggunakan dashboard
4. **Buka Browser Console (F12)** untuk debug error

---

## 📝 Quick Command Reference

### **Jalankan ML Service:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python ml_api_service.py
```

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

**Siap digunakan!** 🎉

Pastikan 3 terminal tetap terbuka saat menggunakan dashboard monitoring petani.

