const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.updateContact(id, req.body);
  if (!result) {
    throw createError(404, `Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
