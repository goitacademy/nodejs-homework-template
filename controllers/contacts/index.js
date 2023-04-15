const { getContactsController } = require("./getContactsController");
const { getContactDataByIdController } = require("./getContactDataByIdController");

const { addNewContactController } = require("./addNewContactController");
const { deleteContactByIdController } = require("./deleteContactByIdController");
const { updateContactByIdController } = require("./updateContactByIdController");

const { updateStatusContactController } = require("./updateStatusContactController");


module.exports = {
    getContactsController,
    getContactDataByIdController,
    addNewContactController,
    deleteContactByIdController,
    updateContactByIdController,
    updateStatusContactController,
}