const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { JWT_SECRET_KEY } = process.env;

const googleAuthLogin = async (req, res, next) => {
  try {
    const { _id, verify } = req.user;
    if (!verify) {
      throw RequestError(401, "Your email is not verified ");
    }
    const payload = {
      id: _id,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
    await User.findByIdAndUpdate(_id, { token, verificationToken: null });
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = googleAuthLogin;
