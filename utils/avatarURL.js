const gravatar = require("gravatar");

const createAvatarURL = (email) => {
  return gravatar.url(email, {
    s: "200",
  });
};

module.exports = {
  createAvatarURL,
};
