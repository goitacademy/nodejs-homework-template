const contacts = require("../../models/contacts.json");

const listContacts = async (req, res) => {
  res.json({
    ststus: "succses",
    code: 200,
    data: contacts,
  });
};

module.exports = listContacts;
