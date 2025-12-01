# ✅ Backend Sudah Deployed!

## 🎉 URL Backend:
**https://vermillion-starship-ad2a6e.netlify.app/**

## 🧪 Test Backend

### 1. Test Health Check
Buka di browser:
```
https://vermillion-starship-ad2a6e.netlify.app/api/health
```

**Harus return:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### 2. Test Endpoints Lain
- Login: `https://vermillion-starship-ad2a6e.netlify.app/api/customer/login`
- Register: `https://vermillion-starship-ad2a6e.netlify.app/api/customer/register`

## ⚙️ Update Frontend

### Langkah 1: Update Environment Variables di Vercel

1. **Buka Vercel Dashboard:**
   - Login ke https://vercel.com
   - Pilih project frontend Anda

2. **Buka Settings:**
   - Klik **Settings** > **Environment Variables**

3. **Update/Create Variable:**
   ```
   Key: VITE_API_BASE_URL
   Value: https://vermillion-starship-ad2a6e.netlify.app
   ```
   **PENTING:** Jangan tambahkan `/api` di akhir!

4. **Redeploy Frontend:**
   - Klik **Deployments** tab
   - Klik **Redeploy** pada deployment terbaru
   - Atau push commit baru untuk trigger auto-deploy

## 🔧 Environment Variables di Netlify (Backend)

Pastikan environment variables sudah di-set di Netlify:

1. **Buka Netlify Dashboard:**
   - Login ke https://app.netlify.com
   - Pilih site backend Anda

2. **Buka Site Settings:**
   - Klik **Site settings** > **Environment variables**

3. **Tambahkan Variables:**
   ```
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
   (Ganti dengan URL frontend Vercel Anda)

   ```
   ML_SERVICE_URL=https://your-ml-service.railway.app
   ```
   (Tambahkan setelah ML service di-deploy)

   ```
   PORT=3000
   ```

4. **Redeploy Backend:**
   - Klik **Deployments** tab
   - Klik **Trigger deploy** > **Deploy site**

## ✅ Testing Setelah Update

### 1. Test dari Browser
Buka frontend URL dan coba:
- Login
- Register
- Fitur lainnya

### 2. Test dari Browser DevTools
1. Buka frontend di browser
2. Tekan **F12** untuk buka DevTools
3. Buka tab **Network**
4. Coba login/register
5. Lihat request ke backend
6. Pastikan tidak ada error CORS atau 404

## 🐛 Troubleshooting

### Error: CORS
**Solusi:** Pastikan `CORS_ORIGIN` di Netlify sudah di-set dengan URL frontend

### Error: 404 Not Found
**Solusi:** 
- Pastikan URL backend benar
- Test health check endpoint dulu
- Cek Netlify logs

### Error: Cannot connect
**Solusi:**
- Pastikan backend sudah running di Netlify
- Cek Netlify deployment logs
- Pastikan environment variables sudah benar

## 📝 Checklist

- [ ] Backend health check berhasil
- [ ] Environment variables di Netlify sudah di-set
- [ ] Environment variables di Vercel (frontend) sudah di-update
- [ ] Frontend sudah di-redeploy
- [ ] Test login dari frontend berhasil
- [ ] Test register dari frontend berhasil

## 🎯 Next Steps

1. **Test backend** dengan health check
2. **Update frontend** environment variables
3. **Redeploy frontend**
4. **Test login/register** dari frontend
5. **Deploy ML service** (jika belum)

---

**Backend sudah live! Sekarang update frontend dan test! 🚀**

