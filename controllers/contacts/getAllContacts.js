// const contactsOperations = require("../../models/contacts");
const {Contact} = require('../../models/contact')

const getAllContacts = async (req, res) => {
  console.log("getAll");

  const contacts = await Contact.find();
  console.log(contacts);
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getAllContacts;
