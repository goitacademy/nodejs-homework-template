const { RequestError } = require("../../helpers/RequestError.js");
const { User } = require("../../models/user.js");
const { userSchemaSignup } = require("../../schemas/validationSchemaUser.js");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_SECRET } = process.env;

async function login(req, res, next) {
  try {
    const validationResult = userSchemaSignup.validate(req.body);
    const { email, password } = req.body;

    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw RequestError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw RequestError(
        401,
        "Email is not verified! Please check your mail box"
      );
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, "JWT_SECRET", { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    return res.json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
