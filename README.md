# 💤 Sleep Monitoring App

Aplikasi berbasis web yang membantu pengguna melacak dan menganalisis kualitas tidur mereka. Dibuat menggunakan **React.js**, **Node.js (Express)**, dan **MySQL**.

---

## 🔥 Fitur Unggulan

- ✅ Autentikasi (Login/Register) dengan **JWT**
- 📈 Visualisasi grafik tidur mingguan (dengan Chart.js)
- 📝 Pencatatan jam tidur dan bangun
- 💡 Rekomendasi kesehatan berdasarkan durasi tidur
- 👤 Profil pengguna (tinggi, berat, usia, kelamin)
- 📆 Riwayat tidur mingguan berdasarkan kalender
- 🔒 Proteksi endpoint dengan middleware auth
- ✨ Animasi halus dengan Framer Motion

---

## 🏗️ Teknologi yang Digunakan

| Frontend      | Backend         | Lainnya            |
| ------------- | --------------- | ------------------ |
| React.js      | Node.js (Express) | JWT (Auth)        |
| Bootstrap 5   | MySQL           | Chart.js           |
| Framer Motion | bcryptjs        | dotenv             |
| React Router  | express-validator | CORS              |

---

## 🧪 Cara Menjalankan

### 🚀 Jalankan Frontend

```bash
cd frontend
npm install
npm start
```

### 🚀 Jalankan Backend

```bash
cd backend
npm install
node index.js
```

## 🧪 .env

PORT=3001
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sleep_monitoring

👨‍💻 Developer
Dibuat dengan ❤️ oleh @darisirfan123
Mahasiswa S2 Sistem Informasi — ITS Surabaya

