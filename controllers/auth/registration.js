const user = require("../../models/userShema");
const { HttpError } = require("../../helpers/index");
const { addShemaAuth } = require("../../JoiShems/index");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const registration = async (req, res) => {
  const { error } = addShemaAuth.validate(req.body);
  if (error) {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await user.create({
      email,
      password: hashPassword,
      avatarURL,
    });
    res
      .status(201)
      .json({ email: result.email, subscription: result.subscription });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw HttpError(409, "Email in use");
    }
  }
};

module.exports = registration;
