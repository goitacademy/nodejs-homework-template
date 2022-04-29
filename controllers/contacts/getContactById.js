const { NotFound } = require("http-errors");
const contactsOperations = require("../../models");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw NotFound(`Contact with id=${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
