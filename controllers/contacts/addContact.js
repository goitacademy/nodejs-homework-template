const contactsOperations = require("../../repository/contacts");
const addContact = async (req, res) => {
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};
module.exports = addContact;
