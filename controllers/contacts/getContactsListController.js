const { Contact } = require("../../models");

const getContactsListController = async (req, res) => {
  const contactsList = await Contact.find({});
  // const contactsList = await getContactsList();
  res.status(200).json(contactsList);
};

module.exports = getContactsListController;
