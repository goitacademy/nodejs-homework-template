// const contacts = require("../../models/contacts.json");
const { Contact } = require("../../models");

// const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {
  const data = await Contact.find({});
  res.status(200).json({
    ststus: "succses",
    code: 200,
    data,
  });
};

module.exports = listContacts;
