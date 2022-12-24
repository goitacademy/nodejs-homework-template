const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
    data: { contact },
  });
};

module.exports = removeContact;
