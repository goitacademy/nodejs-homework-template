const contacts = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getById(id);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;
