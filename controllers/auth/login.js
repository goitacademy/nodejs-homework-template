const bcrypt = require("bcrypt");
const { httpError } = require("../../helpers");
const { User } = require("../../models/users");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const storedUser = await User.findOne({ email });

    if (!storedUser) {
      throw new httpError(401, "Email is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      throw new httpError(401, "Password is wrong");
    }

    const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userWithChangedToken = await User.findOneAndUpdate(
      { email },
      { token },
      { new: true }
    );

    return res.status(200).json({
      token,
      user: {
        email: userWithChangedToken.email,
        subscription: userWithChangedToken.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
