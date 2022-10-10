const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw RequestError(404);
  }
  res.json(contact);
};

module.exports = getContactById;
