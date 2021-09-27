const { getListContacts } = require("../model/contacts");

const getAll = async (req, res, next) => {
  const contacts = await getListContacts();
  res.json({ status: "success", code: 200, data: { contacts } });
};

module.exports = getAll;