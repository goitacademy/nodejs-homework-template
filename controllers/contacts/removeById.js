const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw createError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = removeById;
