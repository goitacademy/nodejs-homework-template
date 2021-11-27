const mongoose = require("mongoose")
const Priority = require("./priorityScheme")

const Task = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, required: true, default: "" },
  priority: { type: Priority.schema, required: true },
  boardId: {type: mongoose.SchemaTypes.ObjectId, ref: 'board', }
})

module.exports = mongoose.model('Task', Task)