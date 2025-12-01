# ⚡ Quick Setup PostgreSQL - Tanpa psql Command!

Jika Anda mengalami error `psql is not recognized`, ikuti panduan ini!

---

## 🚀 Cara TERMUDAH (Recommended)

### Windows: Double-click file ini
**`SETUP_POSTGRESQL.bat`**

File ini akan otomatis:
- ✅ Cek Node.js terinstall
- ✅ Install dependencies
- ✅ Buat database
- ✅ Setup schema

**Tapi pertama-tama, pastikan PostgreSQL sudah terinstall!**

---

## 📋 Langkah-langkah

### Step 1: Install PostgreSQL

Jika PostgreSQL belum terinstall:

1. **Download:** https://www.postgresql.org/download/windows/
2. **Install** dengan default settings
3. **Catat password** yang dibuat untuk user `postgres`
4. **Selesai!**

📖 **Detail lengkap:** Baca `POSTGRESQL_INSTALL_WINDOWS.md`

---

### Step 2: Setup Database (Tanpa psql!)

#### Opsi A: Menggunakan BAT File (Paling Mudah)

1. **Edit file `.env`** di folder `backend/`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mycotrack
   DB_USER=postgres
   DB_PASSWORD=password_anda_disini
   ```
   **Ganti `password_anda_disini` dengan password PostgreSQL Anda!**

2. **Double-click:** `SETUP_POSTGRESQL.bat`

3. **Selesai!** Database sudah dibuat dan schema sudah di-setup

#### Opsi B: Manual (PowerShell)

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"

# 1. Install dependencies
npm install

# 2. Buat file .env (jika belum)
# Edit .env dan isi dengan:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=mycotrack
# DB_USER=postgres
# DB_PASSWORD=password_anda

# 3. Buat database
node database/create-database.js

# 4. Setup schema
node database/setup.js

# 5. Test koneksi
node database/test-connection.js
```

---

### Step 3: Migrasi Data dari JSON

Setelah database dan schema siap, migrasikan data:

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
node database/migrate.js
```

---

## ✅ Verifikasi

Test koneksi database:

```powershell
node database/test-connection.js
```

Harus muncul:
```
✅ Database connection successful!
```

---

## ❌ Troubleshooting

### Error: "password authentication failed"

**Solusi:**
- Edit file `.env` dan pastikan `DB_PASSWORD` sesuai dengan password PostgreSQL
- Default user adalah `postgres`

### Error: "connection refused"

**Solusi:**
1. Pastikan PostgreSQL service berjalan:
   - Tekan `Win + R` → ketik `services.msc` → Enter
   - Cari **"postgresql-x64-15"** (atau versi Anda)
   - Pastikan status **"Running"**
   - Jika tidak, klik kanan → **"Start"**

2. Cek port 5432 tidak digunakan aplikasi lain

### Error: "psql is not recognized"

**Tidak masalah!** Script Node.js tidak memerlukan `psql`. 
Pastikan saja PostgreSQL service berjalan (lihat di atas).

### PostgreSQL belum terinstall?

📖 Baca: `POSTGRESQL_INSTALL_WINDOWS.md`

---

## 🎯 Checklist

- [ ] PostgreSQL terinstall
- [ ] PostgreSQL service berjalan
- [ ] File `.env` dibuat dan dikonfigurasi
- [ ] Dependencies terinstall (`npm install`)
- [ ] Database dibuat (`node database/create-database.js`)
- [ ] Schema dibuat (`node database/setup.js`)
- [ ] Data dimigrasikan (`node database/migrate.js`)
- [ ] Test koneksi berhasil (`node database/test-connection.js`)

---

**Selamat! Database PostgreSQL sudah siap digunakan! 🎉**

