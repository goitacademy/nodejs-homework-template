const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["Politics", "Technology", "Entertainment", "Sports"],
    required: true,
  },
  mainPhoto: { type: String, required: true },
  photos: [{ type: String }],
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
