// const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        status: "Error",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
      //   throw new Unauthorized("Email or password is wrong");
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      res.status(401).json({
        status: "Error",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
      //   throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "Success",
      code: 200,
      data: {
        token,
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
