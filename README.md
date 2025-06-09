# EventSpace Booking App

Aplikasi web sederhana untuk booking tempat event, terdiri dari halaman user umum dan dashboard admin dengan fitur CRUD booking.

---

## Teknologi yang Digunakan

- Backend: Node.js dengan Express.js
- Database: MongoDB dengan Mongoose
- Template Engine: EJS
- Session Management: express-session
- CSS: CSS biasa

---

## Fitur Utama

- Halaman landing page user yang menampilkan daftar booking secara publik
- Dashboard admin dengan login proteksi
- Admin dapat melakukan CRUD booking (create, read, update, delete)
- Session-based authentication untuk admin

---

## Struktur Folder

/eventspace
│
├── /models
│ └── Booking.js # Schema Booking MongoDB
│
├── /routes
│ ├── admin.js # Route untuk admin CRUD dan login
│ └── user.js # Route untuk halaman user
│
├── /views
│ ├── /admin
│ │ ├── dashboard.ejs
│ │ ├── create.ejs
│ │ ├── edit.ejs
│ │ └── login.ejs
│ ├── /user
│ │ └── index.ejs
│ └── /partials
│ ├── header.ejs
│ └── footer.ejs
│
├── /public
│ └── style.css # File CSS
│
├── app.js # File utama Express
├── package.json
└── README.md

---

## Cara Instalasi & Menjalankan Aplikasi

1. Clone repository ini

```bash
git clone https://github.com/username/eventspace.git
cd eventspace
Install dependencies

bash
Salin
Edit
npm install
Buat file .env di root project dan isi dengan:


ADMIN_USER=admin
ADMIN_PASS=admin123
MONGO_URI=mongodb://localhost:27017/eventspace
SESSION_SECRET=your_session_secret
Jalankan server

npm start
Buka di browser

User page: http://localhost:3000/

Admin login: http://localhost:3000/admin/login

Catatan
Pastikan MongoDB sudah berjalan di lokal kamu.

Admin bisa login dengan username dan password sesuai file .env.