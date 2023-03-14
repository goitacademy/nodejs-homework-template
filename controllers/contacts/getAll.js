const createError = require("http-errors");
// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models/contact");

const getAll = async (_, res) => {
  console.log(Contact);
  const result = await Contact.find({});

  if (!result) {
    throw createError(404, "not found");
  }

  res.json({ contacts: result });
};

module.exports = getAll;
