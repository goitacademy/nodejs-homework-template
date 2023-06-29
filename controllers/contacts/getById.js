const Contact = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
