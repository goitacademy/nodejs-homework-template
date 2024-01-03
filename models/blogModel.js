// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  enTitle: { type: String, required: true },
  enDescription: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, enum: ['Travel', 'Food', 'Technology', 'Lifestyle'], required: true },
  mainPhoto: { type: String, required: true },
  photos: [{ type: String }],
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
