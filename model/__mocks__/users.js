/* eslint-disable no-undef */
const { users } = require('./data');
const bcrypt = require('bcryptjs');

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email));
  return user;
});

const findById = jest.fn(id => {
  const [user] = users.filter(el => String(el._id) === String(id));
  return user;
});

const create = jest.fn(({ email, password }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  const newUser = {
    email,
    password: pass,
    _id: '604780b0a33f593b5866d7ad',
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password);
    },
  };
  users.push(newUser);
  return newUser;
});

const updateToken = jest.fn((id, token) => {
  const [user] = users.filter(el => String(el._id) === String(id));
  if (user) {
    user.token = token;
  }
  return {};
});

const updateSubUser = jest.fn((id, subscription) => {
  const [user] = users.filter(el => String(el._id) === String(id));
  if (user) {
    user.subscription = subscription;
  }
  return user;
});

// eslint-disable-next-line no-undef
const updateAvatar = jest.fn((id, avatarURL) => {
  const [user] = users.filter(el => String(el._id) === String(id));
  if (user) {
    user.avatarURL = avatarURL;
  }
  return user.avatarURL;
});

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubUser,
  updateAvatar,
};