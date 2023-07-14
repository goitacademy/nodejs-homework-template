const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await User.create(req.body);

    res.status(201).json({
      subscription: newUser.subscription,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
