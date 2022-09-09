const { createError } = require("../../helpers");
const { User, JoiSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { error } = JoiSchema.validate(req.body);

  if (error) {
    throw createError(400, "Ошибка от Joi или другой библиотеки валидации");
  }

  const { email, password } = req.body;

  const result = await User.findOne({ email });
  if (!result) {
    throw createError(401, "Email or password is wrong");
  }

  const compare = await bcrypt.compare(password, result.password);

  if (!compare) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: result._id,
  };

  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });

  await User.findByIdAndUpdate(result._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: "started",
    },
  });
};

module.exports = login;
