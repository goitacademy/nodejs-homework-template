const HttpError = require("../../helpers");

const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    timestamps: true,
  });

  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} was not found`);
  }

  res.json(contact);
};

module.exports = updateStatusContact;
