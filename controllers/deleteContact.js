const { HttpError } = require("../helpers");

// const { removeContact } = require("../models/index");

const { Contact } = require("../models/contact");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await Contact(contactId);
  if (!deletedContact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = deleteContact;
