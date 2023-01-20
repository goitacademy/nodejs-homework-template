const contactsOperations = require("../../models/contacts");

const getAllContact = async (req, res, next) => {
  const result = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result: result },
  });
};

module.exports = getAllContact;
