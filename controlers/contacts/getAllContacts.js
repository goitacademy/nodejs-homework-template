const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getAllContacts;
