const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 32,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

taskSchema.index({ email: 1 });

taskSchema.statics.getAll = function () {
  return Task.find().lean(); // interesuja mnie tylko czyste dane, bez zbednych informacji
};

taskSchema.methods.htmlfy = function () {
  return `<h2>${this.name}</h2><p>${this.email}</p><p>${this.phone}</p>`;
};
const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
//as;
