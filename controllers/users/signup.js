const { User } = require("../../models/user.js");
const { RequestError } = require("../../helpers/index.js");
const { userSchemaSignup } = require("../../schemas/validationSchemaUser.js");
const bcrypt = require("bcrypt");

async function signup(req, res, next) {
  try {
    const validationResult = userSchemaSignup.validate(req.body);
    const { email, password } = req.body;

    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }

    const mailDubbing = await User.findOne({ email });
    if (mailDubbing) {
      throw RequestError(409, "Email or password already in use!");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { signup };
