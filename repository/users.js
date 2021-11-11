const Users = require('../model/schemaUser');

const findById = async id => {
  return await Users.findById(id);
};

const findByEmail = async email => {
  return await Users.findOne({ email });
};

const findUserByVerifyToken = async verifyToken => {
  return await Users.findOne({ verifyToken });
};

const create = async options => {
  const user = new Users(options);

  return await user.save();
};

const updateToken = async (id, token) => {
  return await Users.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, verify, verifyToken) => {
  return await Users.updateOne({ _id: id }, { verify, verifyToken });
};

const updateSubscription = async (body, userId) => {
  const result = await Users.findOneAndUpdate(
    { owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

const updateAvatar = async (id, avatarURL, idUserCloud = null) => {
  return await Users.updateOne({ _id: id }, { avatarURL, idUserCloud });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateTokenVerify,
  findUserByVerifyToken,
};
