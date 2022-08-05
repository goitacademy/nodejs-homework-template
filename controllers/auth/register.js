const bcryptjs = require('bcryptjs');
const { User, schemas } = require('../../models/user');
const { createError } = require('../../helpers');

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    // throw createError(400, error.message);
    throw createError(400, `Ошибка от Joi или другой библиотеки валидации`);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} in use`);
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: 'starter',
    },
  });
};

module.exports = register;
