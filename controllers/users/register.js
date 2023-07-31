const bcrypt = require("bcrypt");

const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  // checking if user with such email is already registered
  // if yes show err code 409 and notification
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  // hashing password
  const hashPassword = await bcrypt.hash(password, 10);

  // adding a new user if he's registering with unique email
  // with hashed password
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
