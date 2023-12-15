const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) throw HttpError(404, `Contact with id ${contactId} not found`);

  res.json(contact);
};

module.exports = getContactById;
