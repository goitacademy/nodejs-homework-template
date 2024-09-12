const { listContacts } = require("../../services");

const listContactsCtrl = async (req, res) => {
  const { id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  const skip = limit * (page - 1);

  const contacts = await listContacts(owner, skip, limit, favorite);
  res.status(200).json(contacts);
};

module.exports = listContactsCtrl;