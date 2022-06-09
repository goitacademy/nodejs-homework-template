const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, JoiUserSchema } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = JoiUserSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: "Joi or another validation error",
      });

    const { email, password } = req.body;

    const result = await UserModel.findOne({ email });

    if (!result)
      return res.status(401).json({
        message: "Email or password is wrong",
      });

    const comparePasswords = bcrypt.compareSync(password, result.password);

    if (comparePasswords) {
      const payload = { id: result._id };
      const token = jwt.sign(payload, SECRET_KEY);

      await UserModel.findByIdAndUpdate(result._id, { token });
      return res.status(200).json({
        token,
        user: {
          email,
          subscription: "starter",
          avatarURL: result.avatarURL,
        },
      });
    }

    return res.status(401).json({
      message: "Email or password is wrong",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
