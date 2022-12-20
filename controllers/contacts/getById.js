const { getContactById } = require("../../models/contacts");
const { NotFound } = require("http-errors");
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const currentContact = await getContactById(contactId);
  if (!currentContact) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({ ...currentContact });
};

module.exports = getById;
