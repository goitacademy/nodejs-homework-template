const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../dataBase/usersModel');
const { NotAuthorizedError } = require('../helpers/errors');
const { updateToken } = require('./userService');

async function registration(email, password) {
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
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
  await updateToken(user._id, jwtToken);
  return jwtToken;
}

async function logout(userId) {
  console.log(userId);
  if (!userId) {
    throw new NotAuthorizedError('Not authorized. You need to be logged in!');
  }

  const data = await updateToken(userId, null);
  console.log(data);
  return data;
}

module.exports = {
  registration,
  login,
  logout,
};
