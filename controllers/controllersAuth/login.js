const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    console.log("user._id--->", user._id);
    console.log("token--->", { token });

    res.status(201).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    console.log("error login");
    next(error);
  }
};

module.exports = login;
