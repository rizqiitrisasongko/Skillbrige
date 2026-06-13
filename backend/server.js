const express = require('express');
const cors = require('cors'); // Library untuk menghubungkan frontend dan backend
const app = express();

// Gunakan cors agar frontend bisa mengakses backend
app.use(cors());

// --- Kode koneksi database kamu harus ada di sini (sebelum app.get) ---
// Pastikan variabel 'db' kamu sudah didefinisikan di sini agar bisa digunakan di bawah

// Route untuk mengambil data kursus
app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows); // Mengirim data kursus dalam bentuk JSON
  });
});

app.listen(4000, () => {
  console.log('Server jalan di http://localhost:4000');
});