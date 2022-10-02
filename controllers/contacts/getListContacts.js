const contactsOperations = require("../../models/contacts");

const getListContacts = async (req, res) => {
  const contacts = await contactsOperations.getListContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getListContacts;
