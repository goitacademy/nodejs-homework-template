<<<<<<< HEAD
const { Contact } = require("../../models/contacts");
const { createError } = require("../../middlewares");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
=======
const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
  if (!result) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
