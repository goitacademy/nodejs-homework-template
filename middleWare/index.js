const { validateBodyForPatch, validateBodyForPost } = require("./validateBody");
const invalidId = require("./invalidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateBodyForPost,
  invalidId,
  validateBodyForPatch,
  authenticate,
  upload,
};
