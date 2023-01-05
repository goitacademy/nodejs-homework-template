const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const { User } = require('../../models/user');

const createHttpError = require('http-errors');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if (!user) {
    throw createHttpError(401, "Email invalid...");
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, "Password invalid...");
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token }); 

  res.json({
    token
  })
}

module.exports = login;