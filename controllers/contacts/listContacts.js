// const contactsOperation = require("../../models/contacts");
const {Contact} = require("../../models");

const listContacts = async (req, res) => {
  const contacts = await Contact({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
