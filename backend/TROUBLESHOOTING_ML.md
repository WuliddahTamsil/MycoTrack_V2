# 🔧 Troubleshooting ML Detection Integration

## Error: 404 Not Found - `/api/ml/detect`

### Penyebab
Backend belum di-restart setelah perubahan atau endpoint tidak terdaftar.

### Solusi

1. **Restart Backend Server:**
   ```cmd
   # Stop backend (CTRL+C di terminal backend)
   # Kemudian start lagi:
   cd backend
   npm start
   ```

2. **Verifikasi Endpoint Terdaftar:**
   - Buka browser: `http://localhost:3000/`
   - Cek apakah endpoint `/api/ml/detect` ada di list

3. **Cek Log Backend:**
   - Saat upload gambar, harus ada log: `[ML DETECT] Received detection request`
   - Jika tidak ada, berarti request tidak sampai ke backend

## Error: ML Service Tidak Berjalan

### Gejala
- Error: "ML service tidak dapat diakses"
- Error: "ECONNREFUSED"
- Error: "Connection refused"

### Solusi

1. **Jalankan ML Service:**
   ```cmd
   cd "machine learning\Project"
   python ml_api_service.py
   ```

2. **Verifikasi ML Service:**
   - Buka browser: `http://localhost:5000/health`
   - Harus muncul: `{"status": "healthy", "model_loaded": true}`

3. **Cek Port 5000:**
   - Pastikan tidak ada aplikasi lain yang menggunakan port 5000
   - Jika port terpakai, ubah port di `ml_api_service.py` dan `backend/server.js`

## Error: Model Tidak Ditemukan

### Gejala
- Error: "Model not found: weights/best.pt"
- ML service jalan tapi model tidak ter-load

### Solusi

1. **Cek File Model:**
   ```cmd
   cd "machine learning\Project"
   dir weights\best.pt
   ```

2. **Jika Model Tidak Ada:**
   ```cmd
   python scripts\2_train_model.py
   ```

## Error: Dependencies Tidak Terinstall

### Gejala
- Error: "ModuleNotFoundError: No module named 'flask'"
- Error saat menjalankan `ml_api_service.py`

### Solusi

1. **Install Dependencies:**
   ```cmd
   cd "machine learning\Project"
   pip install -r requirements_ml_api.txt
   ```

2. **Atau Gunakan Setup Script:**
   ```cmd
   setup_ml_service.bat
   ```

## Checklist Debugging

Saat error terjadi, cek:

- [ ] **Backend berjalan?** → `http://localhost:3000/`
- [ ] **ML Service berjalan?** → `http://localhost:5000/health`
- [ ] **Model ada?** → `machine learning\Project\weights\best.pt`
- [ ] **Dependencies terinstall?** → `pip list | findstr flask`
- [ ] **Port tidak terpakai?** → Cek port 3000 dan 5000
- [ ] **Backend sudah di-restart?** → Setelah perubahan kode

## Test Manual

### 1. Test ML Service Langsung
```cmd
curl http://localhost:5000/health
```

### 2. Test Backend ML Endpoint
```cmd
cd backend
node check_ml_service.js
```

### 3. Test dari Browser Console
```javascript
// Test health check
fetch('http://localhost:3000/api/ml/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

## Log yang Harus Muncul

### Backend Log (Saat Upload):
```
[ML DETECT] Received detection request
[ML DETECT] Has file: true
[ML DETECT] ML Service URL: http://localhost:5000
[ML DETECT] File uploaded: image-1234567890.jpg
[ML DETECT] Sending to ML service: http://localhost:5000/detect/upload
[ML DETECT] ML service responded successfully
```

### ML Service Log (Saat Deteksi):
```
127.0.0.1 - - [15/Jan/2025 10:30:00] "POST /detect/upload HTTP/1.1" 200 -
```

## Common Issues

### Issue 1: CORS Error
**Solusi:** Pastikan `flask-cors` terinstall dan CORS enabled di `ml_api_service.py`

### Issue 2: Timeout
**Solusi:** Increase timeout di backend (sudah 30 detik) atau optimasi model

### Issue 3: File Upload Gagal
**Solusi:** Cek ukuran file (max 5MB) dan format (JPG, PNG)

### Issue 4: Base64 Encoding Error
**Solusi:** Pastikan image base64 valid, cek di frontend sebelum kirim

## Quick Fix Commands

```cmd
# 1. Stop semua service (CTRL+C di setiap terminal)

# 2. Start ML Service
cd "machine learning\Project"
python ml_api_service.py

# 3. Start Backend (terminal baru)
cd backend
npm start

# 4. Start Frontend (terminal baru)
cd "frontend\MycoTrack Website Development"
npm run dev
```

## Still Not Working?

1. **Cek semua log** di terminal backend dan ML service
2. **Test endpoint** satu per satu dengan curl/browser
3. **Pastikan semua service** berjalan di port yang benar
4. **Restart semua service** dari awal
5. **Cek firewall/antivirus** yang mungkin block connection

