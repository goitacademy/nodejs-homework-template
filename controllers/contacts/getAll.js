const createError = require("http-errors");
const contactOperations = require("../../models/contacts");

const getAll = async (_, res) => {
  const result = await contactOperations.listContacts();

  if (!result) {
    throw createError(404, "not found");
  }

  res.json({ contacts: result });
};

module.exports = getAll;
