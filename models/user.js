const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String,
  }
);

userSchema.virtual("contacts", {
  ref: "contact",
  localField: "_id",
  foreignField: "owner",
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = function () {
  // eslint-disable-next-line no-undef
  const token = jwt.sign({ _id: this._id }, SECRET_KEY);
  this.token = token;
  return token;
};

const User = model("user", userSchema);

module.exports = User;
