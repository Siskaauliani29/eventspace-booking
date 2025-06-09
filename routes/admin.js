const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// konfigurasi transporter email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // email kamu
    pass: process.env.EMAIL_PASS,      // password/app password
  },
});
const multer = require('multer');
const path = require('path');

// Storage config untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/create', isLoggedIn, async (req, res) => {
  const booking = await Booking.create(req.body);

  // kirim email notifikasi
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // kirim ke admin sendiri, atau bisa ke booking.email kalau ada
    subject: 'Booking Baru Dibuat',
    text: `Booking baru dibuat:\nNama: ${booking.name}\nTempat: ${booking.place}\nTanggal: ${booking.date}`,
  }; 
function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) return next();
  res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.loggedIn = true;
    res.redirect('/admin/dashboard');
  } else {
    res.send('Login gagal');
  }
});

router.get('/dashboard', isLoggedIn, async (req, res) => {
  const bookings = await Booking.find();
  res.render('admin/dashboard', { bookings });
});

router.get('/create', isLoggedIn, (req, res) => {
  res.render('admin/create');
});

router.post('/create', isLoggedIn, async (req, res) => {
  await Booking.create(req.body);
  res.redirect('/admin/dashboard');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  res.render('admin/edit', { booking });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/dashboard');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.redirect('/admin/dashboard');
});
transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Gagal kirim email:', err);
    } else {
      console.log('Email terkirim:', info.response);
    }
  });

  res.redirect('/admin/dashboard');
});

module.exports = router;
