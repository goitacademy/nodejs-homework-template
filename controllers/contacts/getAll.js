// const contacts = require("../../models/contacts");
const Contact = require("../../models/contact");
const getAll = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAll;
