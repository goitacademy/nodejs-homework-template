const { cntrlWrapper } = require("../../helpers");

module.exports = {
  getAll: cntrlWrapper(require("./getAll")),
  getById: cntrlWrapper(require("./getById")),
  addContact: cntrlWrapper(require("./addContact")),
  removeContact: cntrlWrapper(require("./removeContact")),
  updateContact: cntrlWrapper(require("./updateContact")),
  updateStatusContact: cntrlWrapper(require("./updateStatusContact")),
};
