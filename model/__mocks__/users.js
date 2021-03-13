const { users } = require('./data');
const bcrypt = require('bcryptjs');

const findByEmail = jest.fn((userEmail) => {
  const [user] = users.filter((el) => String(el.email) === String(userEmail));
  return user;
});

const findById = jest.fn((userId) => {
  const [user] = users.filter((el) => String(el._id) === String(userId));
  return user;
});

const findByToken = jest.fn((userToken) => {
  const [user] = users.filter((el) => String(el.token) === String(userToken));
  return user;
});

const create = jest.fn(({ email, password }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  const user = {
    email,
    password: pass,
    _id: '604780b0a33f593b5866d7ad',
    subscription: 'free',
    imgIdCloud: null,
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password);
    },
  };

  users.push(user);
  return user;
});

const updateToken = jest.fn((userId, userToken) => {
  const [user] = users.filter((el) => String(el._id) === String(userId));
  if (user) {
    user.token = userToken;
    return { email: user.email, token: user.token };
  } else {
    return null;
  }
});

const updateAvatar = jest.fn((userId, avatar, imgIdCloud = null) => {
  const [user] = users.filter((el) => String(el._id) === String(userId));
  if (user) {
    user.avatarURL = avatar;
    user.imgIdCloud = imgIdCloud;
    return user.avatarURL;
  } else {
    return null;
  }
});

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  findByToken,
  updateAvatar,
};
