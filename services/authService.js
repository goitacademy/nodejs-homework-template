const { User } = require("../db/userModel");
const {NotAutorizedError, ConflictError} = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration = async (email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
     throw new ConflictError(`"Email ${email} in use`)
  }
  const user = new User({
    email,
    password,
  });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({email});
  if(!user || !await bcrypt.compare(password, user.password)) {
    throw new NotAutorizedError(`Email or password is wrong`)
  }
  // if (!await bcrypt.compare(password, user.password)) {
  //   throw new NotAutorizedError(`Wrong password`)
  // }
  const token = jwt.sign({
    _id: user._id
  }, process.env.JWT_SECRET, { expiresIn: "1w" })
  user.token = token;
  await user.save();
  return { token, user };
};

module.exports = {
  registration,
  login,
};
