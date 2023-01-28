const mongoose = require("mongoose");
const gravatar = require("gravatar");
const jimp = require("jimp");

jimp
  .read("/public/avatars")
  .then((lenna) => {
    return lenna.resize(256, 256);
  })
  .catch((err) => {
    console.error(err);
  });

const unsecureUrl = gravatar.url(
  "emerleite@gmail.com",
  { s: "100", r: "x", d: "retro" },
  false
);

const schema = mongoose.Schema({
  password: {
    type: String,
    unique: true,
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
  avatarURL: {
    type: String,
    default: unsecureUrl,
  },
  token: String,
  contacts: {
    type: [mongoose.Types.ObjectId],
    rel: "contact",
  },
});

const User = mongoose.model("users", schema);

module.exports = {
  User,
};
