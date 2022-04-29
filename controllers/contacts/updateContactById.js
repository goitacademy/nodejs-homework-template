const { NotFound } = require("http-errors");
const contactsOperations = require("../../models");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.updateContactById(
    contactId,
    req.body
  );
  if (!contact) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(contact);
};

module.exports = updateContactById;
