const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getAll = async (_, res) => {
  const result = await Contact.find({});

  if (!result) {
    throw createError(404, "not found");
  }

  res.json({ contacts: result });
};

module.exports = getAll;
