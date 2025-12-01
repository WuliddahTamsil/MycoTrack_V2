# 🐘 Install PostgreSQL di Windows - Panduan Lengkap

## ❌ Error yang Anda Alami

```
psql : The term 'psql' is not recognized
```

Ini berarti PostgreSQL **belum terinstall** atau belum ada di PATH.

---

## ✅ Solusi: Install PostgreSQL

### Opsi 1: Install PostgreSQL (Recommended)

#### Langkah 1: Download PostgreSQL

1. Buka browser dan kunjungi: **https://www.postgresql.org/download/windows/**
2. Klik **"Download the installer"**
3. Pilih **EnterpriseDB** (official installer)
4. Download versi terbaru (misalnya PostgreSQL 15 atau 16)

#### Langkah 2: Install PostgreSQL

1. **Jalankan installer** yang sudah didownload
2. **Pilih komponen:**
   - ✅ PostgreSQL Server (wajib)
   - ✅ pgAdmin 4 (GUI tool, recommended)
   - ✅ Command Line Tools (wajib untuk psql)
   - ✅ Stack Builder (opsional)

3. **Pilih lokasi install:**
   - Default: `C:\Program Files\PostgreSQL\15\` (atau versi terbaru)
   - Biarkan default jika tidak ada alasan khusus

4. **Setup Data Directory:**
   - Default: `C:\Program Files\PostgreSQL\15\data`
   - Biarkan default

5. **Password untuk user `postgres`:**
   - ⚠️ **PENTING:** Catat password ini! Anda akan membutuhkannya
   - Contoh: `postgres123` (atau password yang lebih kuat)
   - **JANGAN LUPA PASSWORD INI!**

6. **Port:**
   - Default: `5432`
   - Biarkan default

7. **Advanced Options:**
   - Locale: Default (atau pilih `Indonesian, Indonesia`)
   - Biarkan default untuk yang lain

8. **Klik "Next"** sampai selesai

9. **Selesai!** PostgreSQL sudah terinstall

#### Langkah 3: Verifikasi Instalasi

Buka **PowerShell baru** dan jalankan:

```powershell
psql --version
```

Jika muncul versi PostgreSQL, berarti sudah berhasil!

---

### Opsi 2: Tambahkan PostgreSQL ke PATH (Jika sudah terinstall)

Jika PostgreSQL sudah terinstall tapi `psql` tidak dikenali:

1. **Cari lokasi PostgreSQL:**
   - Biasanya di: `C:\Program Files\PostgreSQL\15\bin\`
   - Atau cari folder `PostgreSQL` di `C:\Program Files\`

2. **Tambahkan ke PATH:**
   - Tekan `Win + R`, ketik `sysdm.cpl`, Enter
   - Tab **"Advanced"** → **"Environment Variables"**
   - Di **"System variables"**, cari **"Path"** → klik **"Edit"**
   - Klik **"New"** → tambahkan: `C:\Program Files\PostgreSQL\15\bin`
   - Klik **"OK"** di semua dialog
   - **Restart PowerShell** (tutup dan buka lagi)

3. **Test lagi:**
   ```powershell
   psql --version
   ```

---

## 🚀 Setup Database Setelah Install

### Cara 1: Menggunakan pgAdmin 4 (GUI - Lebih Mudah)

1. **Buka pgAdmin 4** (dari Start Menu)
2. **Masukkan password** yang dibuat saat install
3. **Klik kanan** pada **"Databases"** → **"Create"** → **"Database"**
4. **Nama database:** `mycotrack`
5. **Klik "Save"**

### Cara 2: Menggunakan PowerShell (Command Line)

Setelah PostgreSQL terinstall, buka PowerShell dan jalankan:

```powershell
# Login ke PostgreSQL (masukkan password yang dibuat saat install)
psql -U postgres

# Di dalam psql, jalankan:
CREATE DATABASE mycotrack;

# Verifikasi database dibuat
\l

# Exit
\q
```

### Cara 3: Menggunakan Script Node.js (Tidak Perlu psql!)

Jika `psql` masih tidak bekerja, gunakan script Node.js yang sudah saya buat:

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"

# Install dependencies (jika belum)
npm install

# Buat database menggunakan Node.js
node -e "const {Pool}=require('pg');const p=new Pool({host:'localhost',port:5432,user:'postgres',password:'PASSWORD_ANDA',database:'postgres'});p.query('CREATE DATABASE mycotrack',(e,r)=>{if(e&&!e.message.includes('already exists'))console.error('Error:',e.message);else console.log('✅ Database created!');p.end();});"
```

**Ganti `PASSWORD_ANDA` dengan password PostgreSQL Anda!**

---

## 📝 Setup Database Schema

Setelah database dibuat, setup schema:

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"

# Buat file .env dulu (lihat langkah berikutnya)

# Setup schema
node database/setup.js
```

---

## ⚙️ Konfigurasi Environment

Buat file `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mycotrack
DB_USER=postgres
DB_PASSWORD=password_anda_disini
```

**Ganti `password_anda_disini` dengan password PostgreSQL Anda!**

---

## ✅ Verifikasi Setup

Test koneksi database:

```powershell
cd "D:\RPL_Kelompok 4 - NOVA\backend"
node database/test-connection.js
```

Jika berhasil, akan muncul:
```
✅ Database connection successful!
```

---

## 🔄 Alternatif: Gunakan Database Online (Tanpa Install)

Jika tidak ingin install PostgreSQL di komputer:

### Opsi A: Supabase (Gratis)

1. Daftar di: https://supabase.com
2. Buat project baru
3. Dapatkan connection string
4. Update `.env` dengan connection string dari Supabase

### Opsi B: Railway (Gratis)

1. Daftar di: https://railway.app
2. Buat PostgreSQL database
3. Dapatkan connection string
4. Update `.env`

### Opsi C: Neon (Gratis)

1. Daftar di: https://neon.tech
2. Buat database
3. Dapatkan connection string
4. Update `.env`

---

## ❌ Troubleshooting

### Error: "password authentication failed"

**Solusi:**
- Pastikan password di `.env` sesuai dengan password PostgreSQL
- Default user adalah `postgres`

### Error: "database does not exist"

**Solusi:**
- Buat database dulu menggunakan pgAdmin atau script di atas

### Error: "connection refused"

**Solusi:**
1. Pastikan PostgreSQL service berjalan:
   - Tekan `Win + R` → ketik `services.msc` → Enter
   - Cari **"postgresql-x64-15"** (atau versi Anda)
   - Pastikan status **"Running"**
   - Jika tidak, klik kanan → **"Start"**

2. Cek port 5432 tidak digunakan aplikasi lain

### Masih Error?

Gunakan **pgAdmin 4** (GUI tool) untuk setup database, lebih mudah dan tidak perlu command line!

---

## 📚 Referensi

- **PostgreSQL Download:** https://www.postgresql.org/download/windows/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **pgAdmin:** https://www.pgadmin.org/

---

**Setelah PostgreSQL terinstall, lanjutkan ke `POSTGRESQL_SETUP.md` untuk setup database!** 🚀

