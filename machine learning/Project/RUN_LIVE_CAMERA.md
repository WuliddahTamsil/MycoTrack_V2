# 🎥 Cara Menjalankan Deteksi Live Camera

## 📋 Persyaratan

1. **Python** (versi 3.8 atau lebih baru)
2. **Webcam** terhubung ke komputer
3. **Dependencies** sudah terinstall (lihat langkah 1)

## 🚀 Langkah-Langkah

### 1️⃣ Install Dependencies (Jika Belum)

Pastikan semua dependencies sudah terinstall. Jika belum, jalankan:

**Cara Cepat (Double-click file):**
```
install_all_dependencies.bat
```

**ATAU via Command Prompt/PowerShell:**
```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
pip install torch torchvision opencv-python numpy ultralytics
```

> ⏱️ **Catatan:** Install PyTorch bisa memakan waktu 10-15 menit karena file-nya besar (~2GB)

### 2️⃣ Verifikasi Model Path

Model yang digunakan ada di:
```
yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt
```

Pastikan file ini ada. Jika tidak ada, hubungi tim machine learning.

### 3️⃣ Jalankan Deteksi Live Camera

**Cara 1: Menggunakan Script Batch (PALING MUDAH)**

Double-click file:
```
RUN_LIVE_CAMERA.bat
```

**Cara 2: Via Command Prompt/PowerShell**

```cmd
cd "D:\RPL_Kelompok 4 - NOVA\machine learning\Project"
python detect_jamur_pc.py
```

**Cara 3: Via Python langsung**

```cmd
python "D:\RPL_Kelompok 4 - NOVA\machine learning\Project\detect_jamur_pc.py"
```

## 📹 Cara Menggunakan

1. **Buka Program**
   - Jalankan script sesuai cara di atas
   - Program akan membuka window webcam

2. **Pastikan Webcam Aktif**
   - Jika menggunakan webcam eksternal, pastikan sudah terhubung
   - Jika webcam tidak terbuka, edit `config.py`:
     ```python
     WEBCAM_INDEX = 1  # Coba ganti ke 1, 2, atau 3
     ```

3. **Arahkan Kamera ke Jamur**
   - Program akan langsung mendeteksi otomatis
   - Deteksi muncul real-time di layar

4. **Keluar dari Program**
   - Tekan tombol **`q`** di keyboard untuk keluar
   - ATAU tutup window dengan klik **X**

## 🎯 Fitur yang Tersedia

- ✅ **Deteksi Real-time** - Mendeteksi jamur secara langsung
- ✅ **Klasifikasi Fase** - Menampilkan fase pertumbuhan:
  - 🟡 **Primordia** (siap panen dalam 4 hari)
  - 🟠 **Muda** (siap panen dalam 2 hari)
  - 🟢 **Matang** (siap panen sekarang)
- ✅ **FPS Counter** - Menampilkan kecepatan deteksi
- ✅ **Info Panel** - Menampilkan jumlah deteksi per fase

## ⚙️ Konfigurasi

Edit file `config.py` untuk mengubah pengaturan:

```python
# Index webcam (0 = default, 1 = external)
WEBCAM_INDEX = 0

# Confidence threshold (0.0 - 1.0)
# Semakin rendah = lebih sensitif
CONFIDENCE_THRESHOLD = 0.15
```

## ❌ Troubleshooting

### Error: "Cannot open webcam"
**Solusi:**
1. Pastikan webcam tidak digunakan aplikasi lain
2. Coba ubah `WEBCAM_INDEX` di `config.py` (0, 1, 2, dst)
3. Restart program

### Error: "Model not found"
**Solusi:**
1. Pastikan file model ada di: `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
2. Jika tidak ada, hubungi tim machine learning

### Error: "ModuleNotFoundError"
**Solusi:**
1. Install dependencies terlebih dahulu:
   ```cmd
   pip install torch torchvision opencv-python numpy ultralytics
   ```
2. Atau jalankan: `install_all_dependencies.bat`

### Webcam Lambat/Lag
**Solusi:**
1. Tutup aplikasi lain yang menggunakan webcam
2. Tutup browser/tab yang menggunakan kamera
3. Restart program

### Deteksi Tidak Akurat
**Solusi:**
1. Pastikan pencahayaan cukup
2. Pastikan kamera fokus
3. Jaga jarak yang tepat (tidak terlalu dekat/jauh)
4. Pastikan jamur dalam frame kamera

## 📝 Catatan Penting

- ⚠️ **Jangan tutup terminal** saat program berjalan
- ⚠️ **Pastikan webcam tidak digunakan aplikasi lain**
- ✅ **Program akan otomatis menggunakan model dari `yolov5_new` folder**
- ✅ **Tekan `q` untuk keluar dengan aman**

## 🎓 Informasi Model

- **Model:** YOLOv5 Custom (mushroom_custom)
- **Lokasi:** `yolov5_new/yolov5/runs/train/mushroom_custom/weights/best.pt`
- **Kelas:** Primordia, Muda, Matang
- **Ukuran Input:** 640x640 pixels

---

**Selamat mencoba! 🍄📸**

