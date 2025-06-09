const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.render('user/index', { bookings });
});

module.exports = router;
