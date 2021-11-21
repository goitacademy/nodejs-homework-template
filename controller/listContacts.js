const ContactsModel = require("../model");

const listContacts = async (req, res) => {
  const contacts = await ContactsModel.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
