const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../db/userModel");
const { RequestError } = require("../../helpers/requestError");

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, "Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { token: token });

  const answer = {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
  return answer;
};
module.exports = { loginUserService };
