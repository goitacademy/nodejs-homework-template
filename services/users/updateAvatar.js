const { User } = require('../../models/user');

module.exports = async (_id, avatarURL, originalName) => {
  return await User.findByIdAndUpdate(_id, {
    avatarURL,
    avatarOriginalName: originalName,
  });
};
