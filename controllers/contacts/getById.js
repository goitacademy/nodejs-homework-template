const { Contact } = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json(contact);
};

module.exports = getById;
