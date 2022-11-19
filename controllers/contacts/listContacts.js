const contactsOperations = require("../../models/contactsFunctions");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};
module.exports = listContacts;
