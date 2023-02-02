const { Contact } = require("../../models");

const getContactsListController = async (req, res) => {
  const contactsList = await Contact.find({});
  res.status(200).json(contactsList);
};

module.exports = getContactsListController;
