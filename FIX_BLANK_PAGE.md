# 🔧 Fix: Frontend Blank di localhost:5173

## 🔍 Diagnosa:

Frontend sudah berjalan di port 5173, tapi halaman blank. Ini biasanya karena:

1. **JavaScript Error** di console browser
2. **Build/Compile Error** di terminal
3. **Routing Error** di App.tsx
4. **CSS tidak load**

## ✅ Solusi Step-by-Step:

### 1. Cek Browser Console (PENTING!)

1. **Buka:** `http://localhost:5173`
2. **Tekan F12** untuk buka DevTools
3. **Buka tab Console**
4. **Lihat error message** (jika ada)

**Error yang mungkin muncul:**
- `Cannot find module`
- `Uncaught Error`
- `Failed to load`
- `SyntaxError`

**Copy error message** dan beri tahu saya!

### 2. Cek Terminal Frontend

Lihat terminal yang menjalankan `npm run dev`:
- Apakah ada error?
- Apakah build berhasil?
- Apakah ada warning?

### 3. Restart Frontend

**Stop frontend:**
- Tekan `Ctrl + C` di terminal frontend

**Start lagi:**
```bash
cd frontend
npm run dev
```

### 4. Clear Browser Cache

1. **Tekan `Ctrl + Shift + R`** (hard refresh)
2. **Atau buka incognito mode**
3. **Atau clear cache:**
   - F12 > Application tab > Clear storage > Clear site data

### 5. Cek File Dependencies

**Pastikan semua dependencies terinstall:**
```bash
cd frontend
npm install
```

### 6. Cek File App.tsx

Pastikan file `frontend/src/App.tsx` ada dan tidak error.

## 🐛 Common Errors & Solutions:

### Error: "Cannot find module './App.tsx'"

**Solusi:**
```bash
cd frontend
npm install
npm run dev
```

### Error: "Failed to resolve import"

**Solusi:**
1. Cek apakah file yang di-import ada
2. Cek path import (relative vs absolute)
3. Restart dev server

### Error: "Uncaught SyntaxError"

**Solusi:**
1. Cek file yang error (biasanya ada di console)
2. Cek syntax error di file tersebut
3. Fix error dan refresh

### Blank Page tanpa Error

**Solusi:**
1. Cek apakah `div#root` ada di HTML
2. Cek apakah React render ke root
3. Cek apakah CSS load
4. Cek Network tab untuk file yang gagal load

## 🔍 Quick Check:

### Test 1: Cek HTML
Buka: `http://localhost:5173`
Tekan `Ctrl + U` (view source)
Harus ada:
```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

### Test 2: Cek Network
1. F12 > Network tab
2. Refresh page
3. Lihat file yang gagal load (status merah)

### Test 3: Cek Console
1. F12 > Console tab
2. Lihat error message
3. Copy error dan cari solusi

## 📝 Checklist:

- [ ] Browser console dibuka (F12)
- [ ] Error message di-copy
- [ ] Terminal frontend dicek untuk error
- [ ] Browser cache sudah di-clear
- [ ] Frontend sudah di-restart
- [ ] Dependencies sudah di-install (`npm install`)
- [ ] File App.tsx ada dan tidak error

---

**PENTING: Buka browser console (F12) dan beri tahu error message yang muncul!** 🚀

