const contacts = require("../../models/contacts");
const { errorHandler } = require("../../helpers");

const getById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw errorHandler(404, "Not found");
  }
  res.json(contact);
};

module.exports = getById;
