const { createError } = require("../../helpers");
const { User, JoiSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = JoiSchema.validate(req.body);

  if (error) {
    throw createError(400, "Ошибка от Joi или другой библиотеки валидации");
  }
  const result = await User.findOne({ email });
  if (!result) {
    throw createError(401, "Email or password is wrong");
  }
  if (result) {
    throw createError(409, "Email in use");
  }
  const pass = await bcrypt.hash(password, 10);
  await User.create({ email, password: pass });
  res.status(201).json({
    users: {
      email,
    },
  });
};

module.exports = register;
