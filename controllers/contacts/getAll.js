const service = require("../../service/contacts");

const getAllContacts = async (req, res) => {
  const contacts = await service.getAllContacts();
  res.status(200).json({ status: "success", code: 200, data: contacts });
};

module.exports = getAllContacts;