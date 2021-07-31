const { Schema } = require("mongoose");

const bcrypt = require("bcryptjs");

const userShema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userShema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = userShema;
