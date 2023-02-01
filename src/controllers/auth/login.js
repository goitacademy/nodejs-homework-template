const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      status: "success",
      code: 200,
      token: token,
      user: { email: user.email, subscription: user.subscription },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;
