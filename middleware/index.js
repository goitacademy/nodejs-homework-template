const { validateBody } = require("./validateBody");
const { validateID } = require("./validateID");
const { authenticate } = require("./authenticate");
module.exports = {
  validateBody,
  validateID,
  authenticate,
};
