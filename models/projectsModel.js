const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const projectsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Completed", "Planned"],
    required: true,
  },
  enTitle: { type: String, required: true },
  enDescription: { type: String, required: true },
  poster: { type: String, required: true },
  videos: [{ type: String }],
  photos: [{ type: String, default: null }],
  locationsCount: { type: Number, required: true },
  partnersCount: { type: Number, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Events" }],
});

const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;
