const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    en: { type: String, required: true },
    uk: { type: String, required: true },
  },
  enTitle: { type: String, required: true },
  enDescription: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
});

const Events = mongoose.model("Events", eventsSchema);

module.exports = Events;
