const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.json({
    status: "Success",
    code: 200,
    message: "Contacts received",
    data: { contacts },
  });
};

module.exports = listContacts;
