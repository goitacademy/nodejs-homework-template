const createError = require("http-errors");

const contactOperations = require("../../models/contacts");

const update = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.updateContact(id, req.body);

  if (!result) {
    throw createError(404, "not found");
  }

  res.status(200).json({ contact: result });
};

module.exports = update;
