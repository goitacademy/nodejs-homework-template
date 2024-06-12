const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const AllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(AllContacts),
};
