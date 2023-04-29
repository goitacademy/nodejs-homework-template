const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const usertSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

usertSchema.post("save", handleMongooseError);

const User = model("contact", usertSchema);

module.exports = User;
