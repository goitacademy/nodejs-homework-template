const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found ID=${contactId}`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = removeContact;
