const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../../models/users.js");
const errorMessage = require("../../helpers/errorMessage.js");

const { SECRET_KEY } = process.env;

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email }).exec();
    if (!user) {
      throw errorMessage(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw errorMessage(401, "Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await users.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logIn;
