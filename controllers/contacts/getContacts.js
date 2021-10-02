const contactsOperations = require("../../model/contacts");

const getContacts = async (req, res, next) => {
  const allContacts = await contactsOperations.getContacts();

  res.json({
    status: "Succeed",
    code: 200,
    data: allContacts,
  });
};

module.exports = getContacts;
