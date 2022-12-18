const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const ContactModel = mongoose.model("contact", contactSchema);

module.exports = ContactModel;

// const Task = require("./schemas/task");

// const getAlltasks = async () => {
//   return Task.find();
// };

// const getTaskById = (id) => {
//   return Task.findOne({ _id: id });
// };

// const createTask = ({ title, text }) => {
//   return Task.create({ title, text });
// };

// const updateTask = (id, fields) => {
//   return Task.findByIdAndUpdate({ _id: id }, fields, { new: true });
// };

// const removeTask = (id) => {
//   return Task.findByIdAndRemove({ _id: id });
// };
