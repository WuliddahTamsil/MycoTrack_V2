# 🔓 Cara Unlock Field di Vercel

## ❌ Masalah:
Field Build Command, Output Directory, dan Install Command tidak bisa diubah (disabled/red circle).

## ✅ Solusi:

### Langkah 1: Ubah Framework Preset

1. **Klik dropdown "Framework Preset"**
2. **Pilih "Other"** (bukan Express)
3. Setelah pilih "Other", field-field akan menjadi editable!

### Langkah 2: Isi Konfigurasi Manual

Setelah field bisa diubah, isi dengan:

```
Framework Preset: Other                    ← UBAH INI
Root Directory: backend                    ✓
Build Command: npm install                 ← SEKARANG BISA DIUBAH
Output Directory: (kosongkan)               ← SEKARANG BISA DIUBAH
Install Command: npm install                ← SEKARANG BISA DIUBAH
```

**ATAU lebih sederhana:**

```
Framework Preset: Other
Root Directory: backend
Build Command: (kosongkan)
Output Directory: (kosongkan)
Install Command: (kosongkan)
```

## 🎯 Alasan:

- **Express preset** mengunci beberapa field karena Vercel punya default config untuk Express
- **Other preset** memberikan kontrol penuh untuk konfigurasi manual
- Backend kita perlu konfigurasi custom, jadi pakai "Other" lebih baik

## ✅ Setelah Ubah ke "Other":

1. Field akan menjadi editable
2. Isi sesuai konfigurasi di atas
3. Klik "Deploy"
4. Setelah deploy, tambahkan environment variables

---

**Intinya: Ubah Framework Preset dari "Express" ke "Other" dulu!**

