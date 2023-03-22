const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 70,
    required: [true, "Set name for contact"],
    trim: true,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 25,
    required: [true, "Set emaile for contact"],
    unique: [true, "Set unique emaile for contact"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: [true, "Set phone for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", userSchema);

module.exports = {
  Contact,
};
