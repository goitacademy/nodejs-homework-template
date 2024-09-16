const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw createError(404, `Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = removeById;
