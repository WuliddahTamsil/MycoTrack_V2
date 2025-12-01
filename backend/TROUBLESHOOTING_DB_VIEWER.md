# 🔧 Troubleshooting Database Viewer

## ❌ Error: "ERR_CONNECTION_REFUSED" atau "localhost refused to connect"

Ini berarti **server belum berjalan** atau ada masalah dengan koneksi.

---

## ✅ Solusi Step-by-Step

### Step 1: Pastikan Server Berjalan

**Cek apakah server sudah berjalan:**

1. **Jalankan Database Viewer:**
   ```powershell
   cd "D:\RPL_Kelompok 4 - NOVA\backend"
   npm run db-viewer
   ```
   
   Atau double-click: `START_DB_VIEWER.bat`

2. **Pastikan melihat output ini:**
   ```
   ✅ Database connection successful!
   ✅ Database Viewer running on: http://localhost:3001/db-viewer
   ```

3. **Jika ada error**, baca pesan error dan ikuti troubleshooting di bawah.

---

### Step 2: Cek Database Connection

**Test koneksi database dulu:**

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
node database/test-connection.js
```

**Jika error:**
- Pastikan PostgreSQL service berjalan
- Cek file `.env` sudah benar
- Pastikan database sudah dibuat

---

### Step 3: Cek File .env

**Pastikan file `.env` ada di folder `backend/`:**

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mycotrack
DB_USER=postgres
DB_PASSWORD=password_anda_disini
```

**Ganti `password_anda_disini` dengan password PostgreSQL Anda!**

---

### Step 4: Cek PostgreSQL Service

**Pastikan PostgreSQL service berjalan:**

1. Tekan `Win + R`
2. Ketik `services.msc` → Enter
3. Cari **"postgresql-x64-15"** (atau versi Anda)
4. Pastikan status **"Running"**
5. Jika tidak, klik kanan → **"Start"**

---

### Step 5: Cek Port 3001

**Pastikan port 3001 tidak digunakan aplikasi lain:**

```powershell
netstat -ano | findstr :3001
```

Jika ada proses lain, tutup aplikasi tersebut atau ganti port di `database/viewer.js`:

```javascript
const PORT = 3002; // Ganti ke port lain
```

---

## 🔍 Error Messages & Solutions

### Error: "password authentication failed"

**Solusi:**
- Edit file `.env` dan pastikan `DB_PASSWORD` sesuai dengan password PostgreSQL
- Default user adalah `postgres`

---

### Error: "database does not exist"

**Solusi:**
1. Buat database dulu:
   ```powershell
   node database/create-database.js
   ```

2. Atau jalankan setup lengkap:
   ```powershell
   # Double-click: SETUP_POSTGRESQL.bat
   ```

---

### Error: "connection refused"

**Solusi:**
1. Pastikan PostgreSQL service berjalan (lihat Step 4)
2. Cek port 5432 tidak digunakan aplikasi lain
3. Cek firewall tidak memblokir koneksi

---

### Error: "Cannot find module 'pg'"

**Solusi:**
```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm install
```

---

### Error: "Cannot find module 'dotenv'"

**Solusi:**
```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
npm install
```

---

## 🚀 Quick Fix

**Jika semua gagal, jalankan setup lengkap:**

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"

# 1. Install dependencies
npm install

# 2. Buat file .env (jika belum)
# Edit .env dan isi dengan password PostgreSQL

# 3. Buat database
node database/create-database.js

# 4. Setup schema
node database/setup.js

# 5. Test connection
node database/test-connection.js

# 6. Jalankan viewer
npm run db-viewer
```

---

## 📝 Checklist

Sebelum menjalankan Database Viewer, pastikan:

- [ ] PostgreSQL terinstall
- [ ] PostgreSQL service berjalan
- [ ] Database `mycotrack` sudah dibuat
- [ ] File `.env` ada dan dikonfigurasi dengan benar
- [ ] Dependencies terinstall (`npm install`)
- [ ] Port 3001 tidak digunakan aplikasi lain

---

## 💡 Tips

1. **Jalankan di terminal terpisah:** Jangan tutup terminal saat viewer berjalan
2. **Cek console output:** Lihat pesan error di terminal untuk detail
3. **Test connection dulu:** Selalu test koneksi sebelum menjalankan viewer
4. **Gunakan BAT file:** Lebih mudah dan otomatis handle error

---

## 🆘 Masih Error?

Jika masih error setelah semua langkah di atas:

1. **Cek log error** di terminal
2. **Screenshot error message**
3. **Cek versi Node.js:** `node --version` (harus 14+)
4. **Cek versi PostgreSQL:** `psql --version` (jika terinstall)

Atau gunakan **pgAdmin 4** sebagai alternatif (GUI tool yang terinstall bersama PostgreSQL).

---

**Setelah server berjalan, buka browser: http://localhost:3001/db-viewer** 🚀

