const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicated"],
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: Boolean,
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
});
