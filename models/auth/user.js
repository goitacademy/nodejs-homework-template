const { User } = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const HttpError = require("../../helpers/HttpError");

dotenv.config();

const { SECRET_KEY } = process.env;

const registerUser = async (req) => {
  const { name, email, password, subscription } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await User.create({ name, email, subscription, password: hashPassword });
  return { email, subscription };
};

const loginUser = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
};

const updateSubUser = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const updatedUser =  await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    throw HttpError(404, `Not found`);
  }
  return updatedUser;
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateSubUser
};
