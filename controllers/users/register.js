const { User, schemas } = require("../../models/users");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.usersPostSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password } = req.body;

    const mailIsUsed = await User.findOne({ email });
    if (mailIsUsed) {
      throw RequestError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const result = await User.create({
      password: hashedPassword,
      email,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
