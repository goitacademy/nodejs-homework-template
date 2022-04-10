const contactMethod = require("../../repository/index");

const { listContacts } = contactMethod.listContacts;

const getlistContacts = async (req, res, next) => {
  const contacts = await listContacts();
  console.log(contacts);
  res.json({ status: "success", code: 200, payload: { contacts } });
};

module.exports = {
  getlistContacts,
};
