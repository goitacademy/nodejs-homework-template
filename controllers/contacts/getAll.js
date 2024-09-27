const contactsOperations = require("../../models/contacts.js");

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  if (!contacts) {
    return null;
  }
  res.status(200).json({
    message: "the request for all contacts was made successfully",
    result: { contacts },
  });
};

module.exports = getAll;
