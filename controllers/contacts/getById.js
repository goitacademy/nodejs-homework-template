const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({ _id: contactId });
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getById;
