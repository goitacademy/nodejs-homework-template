const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
});

const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
