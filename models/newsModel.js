const mongoose = require("mongoose");

const enCategory = [
  "Announcements",
  "Articles",
  "Projects",
  "Events",
  "Personals",
];
const ukCategory = ["Анонси", "Статті", "Проекти", "Події", "Персоналії"];

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: {
    en: { type: String, enum: enCategory, required: true },
    uk: { type: String, enum: ukCategory, required: true },
  },
  enTitle: { type: String, required: true },
  enDescription: { type: String, required: true },
  mainPhoto: { type: String, required: true },
  photos: [{ type: String }],
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
