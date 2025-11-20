# Konfigurasi Port - MycoTrack

## Port Configuration

### ✅ Frontend (Vite)
- **Port:** `5173` (default Vite)
- **URL:** `http://localhost:5173`
- **File:** `vite.config.ts`

### ✅ Backend (Express)
- **Port:** `3000`
- **URL:** `http://localhost:3000`
- **File:** `backend/server.js`

## Mengapa Port Berbeda?

Frontend dan backend **HARUS** berjalan di port yang berbeda karena:
1. Satu port hanya bisa digunakan oleh satu aplikasi
2. Jika sama, akan terjadi konflik (port already in use)
3. Frontend dan backend adalah aplikasi terpisah

## Cara Menjalankan

### 1. Start Backend (Terminal 1)
```bash
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm start
```
Backend akan berjalan di: `http://localhost:3000`

### 2. Start Frontend (Terminal 2)
```bash
cd "D:\RPL_Kelompok 4 - NOVA\frontend\MycoTrack Website Development"
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

## CORS Configuration

Backend sudah dikonfigurasi untuk menerima request dari:
- `http://localhost:5173` (frontend)
- `http://localhost:5174` (jika 5173 penuh)
- `http://127.0.0.1:5173`

## Troubleshooting

### Error: "Port 3000 already in use"
- **Penyebab:** Ada aplikasi lain menggunakan port 3000
- **Solusi:** 
  1. Stop aplikasi lain
  2. Atau ubah PORT di `backend/server.js` ke port lain (misalnya 3001)

### Error: "Port 5173 already in use"
- **Penyebab:** Vite sudah berjalan atau port digunakan
- **Solusi:** 
  1. Vite akan otomatis menggunakan port berikutnya (5174, 5175, dst)
  2. Atau stop proses yang menggunakan port 5173

### Frontend tidak bisa connect ke backend
- **Cek:** Apakah backend berjalan di `localhost:3000`?
- **Test:** Buka `http://localhost:3000/api/health` di browser
- **Pastikan:** CORS di backend sudah benar

