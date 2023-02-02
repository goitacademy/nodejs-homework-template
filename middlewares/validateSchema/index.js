const { validateBody } = require("../validateSchema/validateBody");
const { auth } = require("../validateSchema/auth");

module.exports = {
    validateBody,
    auth,
  };