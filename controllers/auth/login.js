const { findUserByEmail, findUserAndUpdate } = require("../../services/users");
require("dotenv").config();
const { comparePassword } = require("../../middlewares/passwordHash");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });
    const validPassword = comparePassword(password, user.password);

    if (!user || !validPassword) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await findUserAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
