const { validateBodyForPatch, validateBodyForPost } = require("./validateBody");
const invalidId = require("./invalidId");

module.exports = {
  validateBodyForPost,
  invalidId,
  validateBodyForPatch,
};
