const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const { subscription, name } = user;

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (user || !comparePassword || !user.verify) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Email / password are wrong or you are not verify your email",
      });
      return;
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
      user: {
        name,
        email,
        subscription,
      },
    });
  } catch {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = login;
