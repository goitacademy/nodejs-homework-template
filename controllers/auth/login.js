const { findUser } = require("../../services/auth");
require("dotenv").config();
const { comparePassword } = require("../../middlewares/passwordHash");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email });
    const validPassword = comparePassword(password, user.password);

    if (!user || !validPassword) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
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
