const { updateContact } = require("../../models/contacts");
const createError = require("http-errors");
const updateById = async (req, res) => {
  const { id } = req.params;
 
  const result = await updateContact(id, req.body);
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }
  res.status(200).json({
    status: "succes",
    code: 200,
    result,
  });
};

module.exports = updateById;
