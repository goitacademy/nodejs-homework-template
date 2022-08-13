const contactOperations = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactOperations.getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = getById;
