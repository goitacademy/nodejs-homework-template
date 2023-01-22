const { listContacts } = require("../../models/contacts");

const get = async (req, res) => {
  const data = await listContacts();
  if (!data) {
    res.status(500).json({ status: 500, message: "server error" });
  }
  res.status(200).json({ data, status: 200, message: "operation successful" });
};

module.exports = {
  get,
};
