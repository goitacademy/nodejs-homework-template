const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts.js");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const getContact = await contactsOperations.getContactById(contactId);
  if (!getContact) {
    throw new NotFound(`Contact not found`);
  }
  res.status(200).json({
    message: "the id request was made successfully",
    result: { getContact },
  });
};

module.exports = getById;
