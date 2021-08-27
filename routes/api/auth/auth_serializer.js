const { prepereUser } = require("./user_serialize");

function prepareUserWithToken(userWithToken) {
  return {
    user: prepereUser(userWithToken.user),
    token: userWithToken.token,
  };
}

exports.prepareUserWithToken = prepareUserWithToken;
