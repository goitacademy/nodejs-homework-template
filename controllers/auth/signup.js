const { UserModel, JoiUserSchema } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  try {
    const { error } = JoiUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Joi or another validation error",
      });
    }
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email);
    const result = await UserModel.findOne({ email });

    if (result)
      return res.status(409).json({
        message: "Email in use",
      });

    const salt = bcrypt.genSaltSync(10);
    const passwordToSave = bcrypt.hashSync(password, salt);

    await UserModel.create({ email, password: passwordToSave, avatarURL });
    return res.status(201).json({
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
