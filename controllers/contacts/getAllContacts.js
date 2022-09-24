const contactsOperations = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  console.log("getAll");

  const contacts = await contactsOperations.listContacts();
  console.log(contacts);
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getAllContacts;
