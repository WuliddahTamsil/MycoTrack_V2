# 🐘 Panduan Setup PostgreSQL untuk MycoTrack

Panduan lengkap untuk migrasi dari file JSON ke PostgreSQL database.

## 📋 Daftar Isi

1. [Instalasi PostgreSQL](#instalasi-postgresql)
2. [Setup Database](#setup-database)
3. [Install Dependencies](#install-dependencies)
4. [Konfigurasi Environment](#konfigurasi-environment)
5. [Membuat Schema Database](#membuat-schema-database)
6. [Migrasi Data dari JSON](#migrasi-data-dari-json)
7. [Update Backend Code](#update-backend-code)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## 1. Instalasi PostgreSQL

### Windows

1. Download PostgreSQL dari: https://www.postgresql.org/download/windows/
2. Install dengan default settings
3. Catat password yang dibuat untuk user `postgres`
4. PostgreSQL akan berjalan di port `5432` (default)

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### macOS

```bash
# Menggunakan Homebrew
brew install postgresql@14
brew services start postgresql@14
```

### Verifikasi Instalasi

```bash
# Windows (PowerShell)
psql --version

# Linux/macOS
psql --version
```

---

## 2. Setup Database

### Membuat Database dan User

1. **Login ke PostgreSQL** (sebagai superuser):

```bash
# Windows (PowerShell)
psql -U postgres

# Linux/macOS
sudo -u postgres psql
```

2. **Buat database dan user**:

```sql
-- Buat database
CREATE DATABASE mycotrack;

-- Buat user (opsional, bisa pakai postgres)
CREATE USER mycotrack_user WITH PASSWORD 'your_password_here';

-- Berikan privileges
GRANT ALL PRIVILEGES ON DATABASE mycotrack TO mycotrack_user;

-- Exit
\q
```

---

## 3. Install Dependencies

Install package `pg` (node-postgres) untuk koneksi ke PostgreSQL:

```bash
cd backend
npm install pg
```

Atau tambahkan ke `package.json`:

```json
{
  "dependencies": {
    "pg": "^8.11.3"
  }
}
```

---

## 4. Konfigurasi Environment

Buat file `.env` di folder `backend/`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mycotrack
DB_USER=postgres
DB_PASSWORD=your_password_here

# Atau jika menggunakan user khusus
# DB_USER=mycotrack_user
# DB_PASSWORD=your_password_here
```

**⚠️ PENTING:** Jangan commit file `.env` ke Git! Tambahkan ke `.gitignore`:

```
backend/.env
```

---

## 5. Membuat Schema Database

Jalankan script SQL untuk membuat semua tabel:

### Opsi 1: Menggunakan psql (Command Line)

```bash
# Windows
psql -U postgres -d mycotrack -f backend/database/schema.sql

# Linux/macOS
psql -U postgres -d mycotrack -f backend/database/schema.sql
```

### Opsi 2: Menggunakan Node.js Script

Buat file `backend/database/setup.js`:

```javascript
const fs = require('fs');
const path = require('path');
const { query } = require('./db');

async function setupSchema() {
  try {
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );
    
    // Split by semicolon and execute each statement
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    for (const statement of statements) {
      if (statement) {
        await query(statement);
      }
    }
    
    console.log('✅ Schema created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating schema:', error);
    process.exit(1);
  }
}

setupSchema();
```

Jalankan:

```bash
node backend/database/setup.js
```

---

## 6. Migrasi Data dari JSON

Setelah schema dibuat, migrasikan data dari file JSON ke PostgreSQL:

```bash
node backend/database/migrate.js
```

Script ini akan:
- Membaca semua file JSON dari `backend/data/`
- Memasukkan data ke tabel PostgreSQL yang sesuai
- Menangani konflik (update jika sudah ada)

**Catatan:** Script ini menggunakan `ON CONFLICT DO UPDATE`, jadi aman untuk dijalankan berkali-kali.

---

## 7. Update Backend Code

### 7.1. Update Helper Functions

Ganti fungsi `readJSONFile` dan `writeJSONFile` dengan fungsi database.

**Contoh untuk membaca data:**

```javascript
// OLD (JSON)
const customers = await readJSONFile(customersPath);

// NEW (PostgreSQL)
const { rows: customers } = await query('SELECT * FROM customers');
```

**Contoh untuk menulis data:**

```javascript
// OLD (JSON)
await writeJSONFile(customersPath, customers);

// NEW (PostgreSQL)
await query(
  'INSERT INTO customers (id, name, email, ...) VALUES ($1, $2, $3, ...)',
  [id, name, email, ...]
);
```

### 7.2. Update Endpoints

Update semua endpoint di `server.js` untuk menggunakan PostgreSQL.

**Contoh: Login Customer**

```javascript
// OLD
app.post('/api/customer/login', async (req, res) => {
  const customers = await readJSONFile(customersPath);
  const customer = customers.find(c => c.email === email);
  // ...
});

// NEW
app.post('/api/customer/login', async (req, res) => {
  const { rows } = await query(
    'SELECT * FROM customers WHERE LOWER(email) = LOWER($1)',
    [email]
  );
  const customer = rows[0];
  // ...
});
```

### 7.3. Update Transactions

Untuk operasi yang memerlukan transaksi (seperti checkout), gunakan `transaction()`:

```javascript
const { transaction } = require('./database/db');

// Contoh: Checkout dengan transaksi
await transaction(async (client) => {
  // 1. Create order
  await client.query('INSERT INTO orders ...');
  
  // 2. Insert order items
  await client.query('INSERT INTO order_items ...');
  
  // 3. Update product stock
  await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', ...);
  
  // 4. Update customer balance
  await client.query('UPDATE customers SET balance = balance - $1 WHERE id = $2', ...);
  
  // Jika ada error, semua akan di-rollback otomatis
});
```

---

## 8. Testing

### 8.1. Test Koneksi Database

Buat file `backend/database/test-connection.js`:

```javascript
const { query, close } = require('./db');

async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('✅ Database connection successful!');
    console.log('Current time:', result.rows[0].now);
    await close();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
```

Jalankan:

```bash
node backend/database/test-connection.js
```

### 8.2. Test Endpoints

Test semua endpoint setelah migrasi:

```bash
# Test login
curl -X POST http://localhost:3000/api/customer/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test get products
curl http://localhost:3000/api/products
```

---

## 9. Troubleshooting

### Error: "password authentication failed"

**Solusi:**
1. Cek password di `.env` sesuai dengan password PostgreSQL
2. Cek user memiliki akses ke database

```sql
-- Login sebagai postgres
psql -U postgres

-- Reset password
ALTER USER postgres WITH PASSWORD 'new_password';
```

### Error: "relation does not exist"

**Solusi:**
- Pastikan schema sudah dibuat: `node backend/database/setup.js`
- Cek apakah database name benar di `.env`

### Error: "connection refused"

**Solusi:**
1. Pastikan PostgreSQL service berjalan:

```bash
# Windows
# Cek di Services (services.msc)

# Linux
sudo systemctl status postgresql

# macOS
brew services list
```

2. Cek port 5432 tidak digunakan aplikasi lain

### Error: "duplicate key value violates unique constraint"

**Solusi:**
- Data sudah ada di database
- Gunakan `ON CONFLICT DO UPDATE` atau hapus data lama dulu

### Performance Issues

**Optimasi:**
1. Gunakan connection pooling (sudah ada di `db.js`)
2. Tambahkan index untuk kolom yang sering di-query
3. Gunakan prepared statements (parameterized queries)

---

## 📚 Referensi

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres Documentation](https://node-postgres.com/)
- [SQL Tutorial](https://www.postgresqltutorial.com/)

---

## ✅ Checklist Migrasi

- [ ] PostgreSQL terinstall
- [ ] Database `mycotrack` dibuat
- [ ] Dependencies terinstall (`pg`)
- [ ] File `.env` dikonfigurasi
- [ ] Schema database dibuat
- [ ] Data dimigrasikan dari JSON
- [ ] Backend code diupdate
- [ ] Testing berhasil
- [ ] Backup data JSON (untuk jaga-jaga)

---

## 🔄 Rollback ke JSON

Jika perlu rollback ke JSON:

1. Backup data dari PostgreSQL (jika perlu)
2. Hapus atau rename file `.env`
3. Restore fungsi `readJSONFile` dan `writeJSONFile` di `server.js`
4. Restart server

---

**Selamat! Database PostgreSQL sudah siap digunakan! 🎉**

