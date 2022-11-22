const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const { JWT_SECRET_KEY } = process.env;

const facebookAuthLogin = async (req, res, next) => {
  try {
    const { _id, verificationToken } = req.user;
    if (!verificationToken) {
      throw RequestError(401, "Your email is not verified ");
    }
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(_id, {
      token,
      verify: true,
      verificationToken: null,
    });
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = facebookAuthLogin;
