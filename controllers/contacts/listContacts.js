const contactsOperations = require("../../repository/contacts");
const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};
module.exports = listContacts;
