const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../db/authModel");
const { NotAutorizedError } = require("../helpers/errors");

const registrationUser = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new NotAutorizedError(`no user whis email:${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAutorizedError(`password is not correct`);
  }
  const token = await jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  return token;
};
module.exports = {
  registrationUser,
  loginUser,
};
