const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { userSchema } = require("../../schemas");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      throw HttpError(401, "Email or password is wrong");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw HttpError(401, "Email or password is wrong");
    }
    const resMesage = {
      token: "exampletoken",
      user: {
        email: user.email,
        subcription: user.subscription,
      },
    };
    res.json(resMesage);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
