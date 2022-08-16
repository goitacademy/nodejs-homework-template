<<<<<<< HEAD
const { Contact } = require("../../models/contacts");
const { createError } = require("../../middlewares");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
=======
const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
>>>>>>> 2e7b20b03c67d57065d0ce30119fda3b69001c54
  if (!result) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
