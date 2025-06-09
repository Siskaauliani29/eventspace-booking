const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Halaman utama (user)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Ambil semua data
    res.render('index', { bookings }); // Kirim ke view
  } catch (error) {
    res.status(500).send('Gagal mengambil data');
  }
});

module.exports = router;
