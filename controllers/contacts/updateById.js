const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts.js");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const updateContactById = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  if (!updateContactById) {
    throw new NotFound(`Contact not found`);
  }
  res.status(200).json({
    message: "contact successfully updated",
    result: updateContactById,
  });
};

module.exports = removeById;
