const { listContacts } = require("../../models/index");

const getContacts = async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json({
    contacts,
    status: "success",
  });
};

module.exports = { getContacts };
