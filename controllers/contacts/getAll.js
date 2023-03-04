const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      results: contacts,
    },
  });
};

module.exports = getAll;
