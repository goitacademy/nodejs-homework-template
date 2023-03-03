const bcrypt = require("bcryptjs");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = signup;
