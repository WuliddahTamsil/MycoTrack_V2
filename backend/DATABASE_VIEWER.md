# 🐘 Database Viewer - Lihat Tabel di Browser

Web interface untuk melihat tabel dan data PostgreSQL di browser tanpa perlu install tools tambahan!

---

## 🚀 Cara Menggunakan

### Opsi 1: Menggunakan BAT File (Paling Mudah)

**Double-click:** `START_DB_VIEWER.bat`

File akan otomatis:
- ✅ Cek Node.js terinstall
- ✅ Jalankan Database Viewer
- ✅ Buka browser di `http://localhost:3001/db-viewer`

### Opsi 2: Menggunakan NPM Script

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm run db-viewer
```

### Opsi 3: Manual

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
node database/viewer.js
```

Kemudian buka browser: **http://localhost:3001/db-viewer**

---

## ✨ Fitur

### 📊 Daftar Tabel
- Lihat semua tabel di database
- Tampilkan jumlah row per tabel
- Klik tabel untuk melihat data

### 🔍 View Data
- Lihat semua data dalam tabel
- Pagination (50 rows per halaman)
- Search/filter data
- Tampilkan struktur tabel (columns, data types)

### 🎨 Interface
- Modern dan responsive
- Auto-refresh setiap 30 detik
- Easy navigation

---

## 📋 Prerequisites

1. **PostgreSQL sudah terinstall dan berjalan**
2. **Database sudah dibuat** (jalankan `SETUP_POSTGRESQL.bat`)
3. **File `.env` sudah dikonfigurasi** dengan kredensial database

---

## 🎯 Cara Menggunakan

1. **Jalankan Database Viewer:**
   ```powershell
   # Double-click: START_DB_VIEWER.bat
   # Atau:
   npm run db-viewer
   ```

2. **Buka Browser:**
   - URL: `http://localhost:3001/db-viewer`
   - Akan muncul daftar tabel di sidebar kiri

3. **Pilih Tabel:**
   - Klik nama tabel di sidebar
   - Data akan muncul di area kanan

4. **Search Data:**
   - Ketik di search box
   - Tekan Enter untuk search
   - Search akan mencari di semua kolom text

5. **Navigasi:**
   - Gunakan tombol Previous/Next untuk paging
   - Klik Refresh untuk reload data

---

## 🔒 Security

- **Read-only:** Hanya bisa melihat data, tidak bisa edit/delete
- **SELECT only:** Custom query hanya menerima SELECT statement
- **No DDL/DML:** Tidak bisa CREATE, UPDATE, DELETE, DROP, dll

---

## ❌ Troubleshooting

### Error: "Cannot connect to database"

**Solusi:**
1. Pastikan PostgreSQL service berjalan
2. Cek file `.env` sudah benar
3. Pastikan database sudah dibuat

### Error: "Port 3001 already in use"

**Solusi:**
1. Tutup aplikasi lain yang menggunakan port 3001
2. Atau edit `database/viewer.js` dan ganti PORT ke angka lain

### Tabel tidak muncul

**Solusi:**
1. Pastikan schema sudah dibuat (`node database/setup.js`)
2. Refresh browser (F5)
3. Cek console browser untuk error (F12)

### Data tidak muncul

**Solusi:**
1. Pastikan data sudah dimigrasikan (`node database/migrate.js`)
2. Cek apakah tabel memang ada data
3. Coba refresh (tombol Refresh)

---

## 🎨 Screenshot Fitur

### Daftar Tabel
- Sidebar kiri menampilkan semua tabel
- Setiap tabel menampilkan jumlah row

### View Data
- Tabel data dengan kolom yang rapi
- Pagination di bawah
- Search box di atas

### Table Structure
- Info kolom dan tipe data
- Badge untuk setiap kolom

---

## 📝 Catatan

- Database Viewer berjalan di port **3001** (beda dengan backend di port 3000)
- Bisa dijalankan bersamaan dengan backend
- Auto-refresh setiap 30 detik
- Tidak perlu install tools tambahan (pgAdmin, dll)

---

## 🔄 Alternative: pgAdmin 4

Jika ingin tool yang lebih lengkap, gunakan **pgAdmin 4** (biasanya terinstall bersama PostgreSQL):

1. Buka **pgAdmin 4** dari Start Menu
2. Login dengan password PostgreSQL
3. Expand server → Databases → mycotrack
4. Klik kanan tabel → View/Edit Data

Tapi Database Viewer ini lebih simple dan tidak perlu install tambahan! 🎉

---

**Selamat! Sekarang Anda bisa melihat tabel database di browser!** 🚀

