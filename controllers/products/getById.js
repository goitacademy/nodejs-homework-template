const contacts = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
