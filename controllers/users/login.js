const bcrypt = require("bcrypt");
require("dotenv").config();
const usersSchemas = require("../../schemas/login");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  const response = usersSchemas.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).send({ message: "missing required name field" });
  } else {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();

      if (user === null) {
        return res.status(401).json({ error: "Email or password is wrong" });
      }

      if (user.isVerify !== true) {
        return res.status(401).send({ message: "Please verify your email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Email or password is wrong" });
      }
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      await User.findByIdAndUpdate(user._id, { token });

      return res.status(200).json({
        token,

        user: {
          email,
          subscription: user.subscription,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { login };
