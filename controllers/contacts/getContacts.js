const { listContacts } = require("../../service/contacts");
const getContacts = async (req, res) => {
  const data = await listContacts();
  res.json(data);
};
module.exports = getContacts;
