const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: 200,
    data: { contacts },
  });
};

module.exports = getAll;
