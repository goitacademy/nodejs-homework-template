const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
    data: { contact },
  });
};

module.exports = removeContact;
