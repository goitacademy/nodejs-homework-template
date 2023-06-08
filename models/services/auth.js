const { User } = require("../User");
const jwt = require('jsonwebtoken')
const { HttpError } = require("../../utils/HttpError");
const bcrypt = require('bcryptjs')
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
} = process.env;

const signupService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, "Email in use");
  }

  return await User.create({ email, password });
};

const loginService = async ({ email, password }) => {
    const fetchedUser = await User.findOne({email});
    if (!fetchedUser) {
        throw new HttpError(401, "Email or password invalid");
    }

    const isPasswordCorrect = await fetchedUser.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new HttpError(401, "Email or password invalid");
  }
  
  const payload = { id: fetchedUser._id }
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
  await User.findByIdAndUpdate(fetchedUser._id, { token })

  return {user: fetchedUser, token}
  
}

const logoutService = async ({ _id }) => {
  await User.findOneAndUpdate(_id, { token: "" });
}

module.exports = { signupService, loginService, logoutService };
