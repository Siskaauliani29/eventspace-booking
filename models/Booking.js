const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  date: Date, // ✅ ubah jadi Date!
  place: String,
  status: String, // "Confirmed", "Pending"
});

module.exports = mongoose.model('Booking', bookingSchema);
