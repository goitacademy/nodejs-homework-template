const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(contacts);
};

module.exports = getAll;
