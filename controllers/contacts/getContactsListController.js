const { getContactsList } = require("../../models/contacts");

const getContactsListController = async (req, res) => {
  const contactsList = await getContactsList();
  res.status(200).json(contactsList);
};

module.exports = getContactsListController;
