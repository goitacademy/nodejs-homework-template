const { listContacts } = require("../../service/contacts");

const getContactsController = async (req, res) => {
  const data = await listContacts();
  res.status(200).json({ message: data });
};
module.exports = getContactsController;
