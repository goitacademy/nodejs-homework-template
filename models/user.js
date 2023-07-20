const {model, Schema} = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: [true, "Duplicate phone"],
  },
});

const User model('User') 