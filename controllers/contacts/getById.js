const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(result);
};

module.exports = getById;
