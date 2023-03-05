const { HttpError } = require('../../helpers');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_KEY } = process.env;

const requestBodySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const login = async (req, res) => {
  const { error } = requestBodySchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { email, password } = req.body;
  const findUser = await user.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }
  if (user.verify) {
    throw HttpError(401, 'Email not verify');
  }

  const passwordCompare = await bcrypt.compare(password, findUser.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }
  const payload = {
    id: findUser._id,
  };
  const token = jwt.sign(payload, JWT_KEY);

  await user.findByIdAndUpdate(findUser._id, { token });
  res.status(201).json({
    email: findUser.email,
    name: findUser.name,
    token,
  });
};

module.exports = login;
