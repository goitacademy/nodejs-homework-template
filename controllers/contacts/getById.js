const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw createError(404, "not found");
  }

  res.json({ contact: result });
};

module.exports = getById;
