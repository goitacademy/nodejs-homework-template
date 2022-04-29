const { NotFound } = require("http-errors");
const contactsOperations = require("../../models");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      throw NotFound(`Contact with id=${contactId} not found`);
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
