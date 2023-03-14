const { listContacts } = require("../../service/contacts");
const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = limit * (page - 1);
  const data = await listContacts(owner, skip, limit, favorite);
  res.json({ status: "success", data });
};
module.exports = getContactsController;
