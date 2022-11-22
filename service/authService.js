const User = require("./schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotAutorizedError } = require("../helpers/errors");

const signup = async (email, password) => {
  const user = new User({ email, password: await bcrypt.hash(password, 10) });
  await user.save();
};

const signin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAutorizedError(`User ${email} not found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAutorizedError("Incorrect password");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const logout = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new NotAutorizedError("Not authorized");
  }
  await User.findByIdAndUpdate({ _id: id }, { token: null });
};

const currentUser = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new NotAutorizedError("Not authorized");
  }
  return user;
};
module.exports = {
  signup,
  signin,
  logout,
  currentUser,
};
