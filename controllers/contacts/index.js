const { ctrlWrapper } = require("../../helpers");

const addContact = require("./addContact");
const getAll = require("./getAll");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
   getAll: ctrlWrapper(getAll),
   getContactById: ctrlWrapper(getContactById),
   addContact: ctrlWrapper(addContact),
   removeContact: ctrlWrapper(removeContact),
   updateContact: ctrlWrapper(updateContact),
   updateStatusContact: ctrlWrapper(updateStatusContact),
};
