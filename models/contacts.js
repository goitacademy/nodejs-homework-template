const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Action",
      "Biography",
      "History",
      "Horroe",
      "Kids",
      "Learning",
      "Sci-Fi",
      "Thrailer",
      "History drama",
      "War",
    ],
  },
  year: {
    type: Number,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Book", contactSchema)