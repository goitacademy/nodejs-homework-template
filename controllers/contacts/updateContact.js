const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact updated",
    data: { contact },
  });
};

module.exports = updateContact;
