const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const foundContact = await Contact.findById(contactId);

  if (!foundContact) {
    throw HttpError(404, "Not found");
  }

  res.json(foundContact);
};

module.exports = getContactById;
