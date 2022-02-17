const contacts = require("../../models/contacts");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await contacts.updateById(id, req.body);
  if (!result) throw createError(404, "Not found");
  res.json(result);
};

module.exports = updateById;
