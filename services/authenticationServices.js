const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../dataBase/usersModel');
const { NotAuthorizedError } = require('../helpers/errors');

async function registration(email, password) {
  const newUser = new User({ email, password });
  await newUser.save();
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(
      `Invalid email: '${email}' or wrong password, try again`,
    );
  }

  const jwtToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );

  return jwtToken;
}

async function getUser(id) {
  const user = await User.find({});
  return user;
}

module.exports = {
  registration,
  login,
  getUser,
};
