const { ctrlWrapper } = require("../../helpers");

module.exports = {
  getAll: ctrlWrapper(require("./getAll")),
  getById: ctrlWrapper(require("./getById")),
  addContact: ctrlWrapper(require("./addContact")),
  removeContact: ctrlWrapper(require("./removeContact")),
  updateContact: ctrlWrapper(require("./updateContact")),
  updateStatusContact: ctrlWrapper(require("./updateStatusContact")),
};
