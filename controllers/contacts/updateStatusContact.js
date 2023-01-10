const contactsOperations = require("../../models/contactsOperations");
const getError = require("../../routes/error/error");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await contactsOperations.updateContact(contactId, {favorite});
  if (!updatedContact) {
    throw getError(404, "Not Found");
  } else {
    res.json(updatedContact);
  }
};

module.exports = updateStatusContact;

