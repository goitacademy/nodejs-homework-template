const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../middlewares");

const { emailRegexp } = require("../constans/contacts");

const userShema = new Schema({
 password: {
    type: String,
     minlength: 6,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    match:emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true });

userShema.post("save", handleMongooseError);

const User = model("user", userShema);

module.exports = User;