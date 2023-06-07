const { Contact } = require("../../models");
const { ctrlBox } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = ctrlBox(getAllContacts);
