const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const gravatar = require("gravatar");
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
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
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
       required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// userSchema.methods.setPassword = function (password) {
//   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// userSchema.methods.setAvatar = function (avatar) {
//   this.avatarURL = avatar;
// };
// userSchema.methods.setVerifyToken = function (verifyToken) {
//   this.verifyToken = verifyToken;
// };
const User = model("user", userSchema);

module.exports = {
  User,
};
