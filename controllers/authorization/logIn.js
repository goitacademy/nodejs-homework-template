const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (!candidate || !bcrypt.compareSync(password, candidate.password)) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!candidate.verify) {
      throw HttpError(401, "Email not verify");
    }
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
      { id: candidate._id, email: candidate.email },
      JWT_SECRET_KEY,
      { expiresIn: "8h" }
    );
    await User.findOneAndUpdate({ email }, { token });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
module.exports = logIn;
