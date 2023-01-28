const { listContacts } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const data = await listContacts(req);
  if (!data) {
    res.status(500).json({ status: 500, message: "server error" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

module.exports = getAllContacts;
