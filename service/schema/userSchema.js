const mongoose = require("mongoose");
const { InUseError } = require("../../helpers/errors");
const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: {
   type:String,
 },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});
usersSchema.pre("save", function (next) {
  const self = this;

  User.findOne({ email: this.email }, "email", function (err, results) {
    if (err) {
      next(err);
    } else if (results) {
      self.invalidate("email", "email must be unique");
      next(new InUseError("Email already in use"));
    } else {
      next();
    }
  });
});
const User = mongoose.model("user", usersSchema);

module.exports = User;
