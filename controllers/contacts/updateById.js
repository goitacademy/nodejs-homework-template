const contacts = require("../../models/contacts");
const { errorHandler } = require("../../helpers");

const updateById = async (req, res) => {
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  if (!contact) {
    throw errorHandler(404, "Not found");
  }
  res.json(contact);
};

module.exports = updateById;
