const { Unauthorized } = require('http-errors');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { JWT_SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });

  if (!candidate) {
    throw new Unauthorized('Email or password is wrong');
  }

  const isPasswordCorrect = await compare(password, candidate.password);

  if (!isPasswordCorrect) {
    throw new Unauthorized('Email or password is wrong');
  }

  const payload = { id: candidate._id };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

  const { name, email: userEmail, subscription } = candidate;

  await User.findByIdAndUpdate(candidate._id, { token });

  res.json({ token, user: { email: userEmail, name, subscription } });
};

module.exports = loginUser;
