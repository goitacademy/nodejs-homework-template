const createError = require("http-errors");
const contactOperations = require("../../models/contacts");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.getContactById(id);

  if (!result) {
    throw createError(404, "not found");
  }

  res.json({ contact: result });
};

module.exports = getById;
