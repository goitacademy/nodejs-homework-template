const mongoose = require("mongoose")

const Priority = new mongoose.Schema({
  title: { type: String, required: true},
})

module.exports = mongoose.model('Priority', Priority)