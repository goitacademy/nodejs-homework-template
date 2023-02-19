const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found ID=${contactId}`,
    });
  }
  res.json({
    status: "success",
    code: 201,
    data: {
      result: result,
    },
  });
};

module.exports = updateContact;
