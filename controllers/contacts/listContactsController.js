const {listContacts} = require("../../services");

const listContactsController = async (req, res) => {
  const {id: owner} = req.user;
  const {page, limit} = req.query;

  const skip = limit * (page - 1);

  const contacts = await listContacts(owner, skip, limit);
  res.status(200).json(contacts);
};

module.exports = listContactsController;