const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    throw createError(404, `Product with id=${contactId} not found.`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getContactById;
