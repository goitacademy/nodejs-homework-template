const { contacts: operation } = require("../../models");
const createError = require("http-errors");
const dell = async (req, res) => {
  const { id } = req.params;
  const result = await operation.removeContact(id);
  if (!result) {
    throw createError(404, `Product with id ${id} not found`);
  }
  res.status(201).json({
    status: "succes",
    massege: "Contact deleted",
    code: 201,
    dellatedContact: result,
  });
};
module.exports = dell;
