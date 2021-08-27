function prepereUser(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    subscription: user.subscription,
    avatarURL: user.avatarURL
  };
}

function prepereId(user) {
  return {
    id: user._id,
    username: user.username,
    subscription: user.subscription,
  };
}
exports.prepereUser = prepereUser;
exports.prepereId = prepereId;
