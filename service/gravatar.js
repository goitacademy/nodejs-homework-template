const gravatar = require('gravatar');

const avatarUrl = email => {
  return gravatar.url(email, {s:'200', d:'retro'}, true );
};

module.exports = {avatarUrl}