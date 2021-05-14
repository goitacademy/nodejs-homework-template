const { User, users } = require("./data");

const findByEmail = jest.fn((email) => {
  const [user] = users.filter((el) => String(el.email) === String(email));
  return user;
});

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  console.log(user);
  return user;
});

const create = jest.fn(({ email, password, subscription }) => {
  return {};
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateSubscription = jest.fn((id, subscription) => {
  return {};
});

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null) => {
  return {};
});

module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  updateSubscription,
  updateAvatar,
};
