const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contactsFunctions");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw NotFound(`Contact with id = ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContact;
