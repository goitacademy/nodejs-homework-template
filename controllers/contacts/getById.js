const { contacts: operation } = require("../../models");
const createError = require("http-errors");
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await operation.getContactById(id);
  if (!result) {
    throw createError(404, `Contact with id ${id} not found`);
  }
  res.status(200).json({
    status: "succes",
    code: 200,
    result,
  });
};

module.exports = getById;
