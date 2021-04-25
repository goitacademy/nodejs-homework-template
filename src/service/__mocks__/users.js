const { users } = require("./data ");

const findByEmail = jest.fn((email) => {
  const [user] = users.filter((el) => String(el.email) === String(email));

  return user;
});

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  return result;
});

const create = jest.fn((body) => {
  return {};
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatar = jest.fn((id, avatarURL, idCloudAvatar) => {
  return {};
});

const getAvatar = jest.fn((id) => {
  const { avatarURL, idCloudAvatar } = users.filter(
    (el) => String(el._id) === String(id)
  );
  return { avatarURL, idCloudAvatar };
});

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
  getAvatar,
};
