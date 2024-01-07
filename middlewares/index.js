const validateBody = require("./validateBody");
const contactsMiddlewares = require("./contactsMiddleware");
const authMiddlewars = require("../middlewares/authMiddlewars");

module.exports = {
  validateBody,
  contactsMiddlewares,
  authMiddlewars,
};
