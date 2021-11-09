const { listContacts } = require("../model/index");

const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
};

module.exports = getAllContacts;
