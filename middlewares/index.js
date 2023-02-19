const { validateBody } = require("./validate-body.middleware");
const { authUser } = require("./auth-user.middleware");

module.exports = {
  authUser,
  validateBody,
};
