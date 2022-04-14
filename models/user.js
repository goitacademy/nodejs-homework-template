const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { Role } = require("../libs/constant");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, default: "Guest" },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: { type: String, required: true },
    token: { type: String, default: null },
    role: {
      type: String,
      enum: { values: Object.values(Role), message: "Invalid role" },
      default: Role.USER,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    console.log("🚀 ~ file: user.js ~ line 43 ~ salt", salt);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
