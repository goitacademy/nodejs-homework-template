const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
