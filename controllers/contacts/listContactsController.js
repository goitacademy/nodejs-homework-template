const {listContacts} = require("../../services");

const listContactsController = async (req, res) => {
  const {id: owner} = req.user;
  const contacts = await listContacts(owner);
  res.status(200).json(contacts);
};

module.exports = listContactsController;