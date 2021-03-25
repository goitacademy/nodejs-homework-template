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

const create = jest.fn(
  ({ name = 'Guest', email, password, subscription = 'free' }) => {
    const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    const newUser = {
      name,
      email,
      password: pass,
      subscription,
      _id: '5eb074232c30a1378dacdbfr',
      validPassword: function (pass) {
        return bcrypt.compareSync(pass, this.password);
      },
    };
    users.push(newUser);
    return newUser;
  },
);

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateSubscription = jest.fn((id, body) => {
  return {};
});
const updateAvatar = jest.fn((id, avatarUrl) => {
  return {};
});

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};
