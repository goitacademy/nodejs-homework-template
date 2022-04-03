const contactMethod = require("../../models/contacts/index");

const { listContacts } = contactMethod.listContacts;
const db = require("../../db/db");
const getlistContacts = async (req, res, next) => {
  console.table(db);

  const contacts = await listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
};

module.exports = {
  getlistContacts,
};
