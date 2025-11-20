# Changelog - Update Login & Register System

## Perubahan yang Telah Dilakukan

### 1. Frontend Changes

#### Routing System
- ✅ Installed `react-router-dom` untuk routing
- ✅ Setup routing di `App.tsx` dengan routes:
  - `/` - Landing page (public)
  - `/login` - Halaman login customer/petani (full page)
  - `/register` - Halaman registrasi customer/petani (full page)
  - `/admin-login` - Halaman login admin (full page, route khusus)
  - `/dashboard` - Dashboard berdasarkan role user (protected)

#### Halaman Login & Register
- ✅ **LoginPage.tsx** - Halaman login full page (bukan popup)
  - Hanya untuk Customer dan Petani (Admin dihapus dari UI)
  - Link ke halaman register
  - Navigasi ke dashboard setelah login berhasil

- ✅ **RegisterPage.tsx** - Halaman registrasi full page
  - **Customer**: Nama, Email, Password, Nomor HP, Alamat Lengkap, Foto Profil
  - **Petani**: 
    - Identitas: Nama, Email, Password, Nomor HP, Alamat, Foto KTP
    - Toko: Nama Toko, Deskripsi, Foto Toko
    - Lahan: Luas Lahan, Foto Lahan, Jenis Jamur, Jumlah Rak, Jumlah Baglog, Kapasitas Panen
  - Tidak ada pilihan Admin di form registrasi

- ✅ **AdminLoginPage.tsx** - Halaman login admin khusus
  - Hanya bisa diakses melalui route `/admin-login`
  - Tidak muncul di UI umum untuk menjaga privasi

#### AuthContext Update
- ✅ Updated untuk call backend API (localhost:3000)
- ✅ Support file upload untuk foto profil, KTP, dll
- ✅ Interface User diperluas untuk support semua field baru
- ✅ Register function sekarang menerima object dengan semua field

#### LandingPage Update
- ✅ Removed `onOpenAuth` prop
- ✅ Button "Masuk" sekarang navigate ke `/login`
- ✅ Tidak lagi menggunakan AuthModal

### 2. Backend Changes

#### Server Setup
- ✅ Created `backend/server.js` - Express server di port 3000
- ✅ Setup CORS untuk allow frontend access
- ✅ Setup Multer untuk handle file uploads
- ✅ Static file serving untuk uploads di `/uploads`

#### Data Structure
- ✅ `backend/data/admin.json` - Default admin:
  - Email: `adminmyc@gmail.com`
  - Password: `12345678`
- ✅ `backend/data/customers.json` - Array kosong untuk data customer
- ✅ `backend/data/petanis.json` - Array kosong untuk data petani

#### API Endpoints

**Customer:**
- `POST /api/customer/register` - Registrasi customer dengan foto profil
- `POST /api/customer/login` - Login customer

**Petani:**
- `POST /api/petani/register` - Registrasi petani dengan semua field (identitas, toko, lahan)
- `POST /api/petani/login` - Login petani

**Admin:**
- `POST /api/admin/login` - Login admin (hanya login, tidak ada register)

**Health Check:**
- `GET /api/health` - Status server

### 3. File Structure

```
backend/
├── data/
│   ├── admin.json
│   ├── customers.json
│   └── petanis.json
├── uploads/          (auto-created)
├── server.js
├── package.json
└── README.md

frontend/MycoTrack Website Development/src/
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── AdminLoginPage.tsx
├── components/
│   ├── AuthContext.tsx (updated)
│   ├── LandingPage.tsx (updated)
│   └── AuthModal.tsx (tidak digunakan lagi)
└── App.tsx (updated dengan routing)
```

## Cara Menjalankan

### Backend
```bash
cd backend
npm install
npm start
```

Server akan berjalan di `http://localhost:3000`

### Frontend
```bash
cd "frontend/MycoTrack Website Development"
npm install
npm run dev
```

## Catatan Penting

1. **Admin Login**: Hanya bisa diakses melalui `/admin-login`, tidak muncul di UI umum
2. **File Uploads**: File disimpan di `backend/uploads/` dan diakses via `http://localhost:3000/uploads/`
3. **Data Storage**: Semua data user disimpan di JSON files di `backend/data/`
4. **Password**: Saat ini password disimpan plain text (untuk production, harus di-hash)
5. **CORS**: Backend sudah dikonfigurasi untuk allow requests dari frontend

## Testing

### Test Admin Login
1. Buka `http://localhost:5173/admin-login` (atau port frontend Anda)
2. Email: `adminmyc@gmail.com`
3. Password: `12345678`

### Test Customer Register
1. Buka `http://localhost:5173/register`
2. Pilih "Customer"
3. Isi semua field termasuk upload foto profil
4. Submit dan login dengan akun yang baru dibuat

### Test Petani Register
1. Buka `http://localhost:5173/register`
2. Pilih "Petani"
3. Isi semua field termasuk:
   - Identitas petani (dengan foto KTP)
   - Data toko (dengan foto toko)
   - Data lahan (dengan foto lahan)
4. Submit dan login dengan akun yang baru dibuat

