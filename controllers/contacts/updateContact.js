const contactsOperation = require("../../models/contacts");
const createError = require("http-errors");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsOperation.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404, `Contact with id ${contactId} Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
