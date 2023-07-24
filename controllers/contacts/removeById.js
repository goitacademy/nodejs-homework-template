const contacts = require("../../models/contacts");
const { errorHandler } = require("../../helpers");

const removeById = async (req, res) => {
  const contact = await contacts.removeContact(req.params.contactId);
  if (!contact) {
    throw errorHandler(404, "Not found");
  }
  res.json("Contact deleted");
};

module.exports = removeById;
