const { Contact } = require("../../models/contact");

const getListContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

module.exports = getListContacts;
