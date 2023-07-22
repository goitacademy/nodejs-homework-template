const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt, -updatedAt");
  res.status(200).json(result);
};

module.exports = listContacts;
