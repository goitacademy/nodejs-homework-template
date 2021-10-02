const { NotFound } = require("http-errors");
const contactsOperations = require("../../model/contacts");

const getContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const requestedContact = await contactsOperations.getContactById(contactId);
  if (!requestedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Succeed",
    code: 200,
    data: requestedContact,
  });
};

module.exports = getContact;
