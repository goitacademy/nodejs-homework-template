const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
  const body = req.body;
  const addContact = await contactsOperations.addContact(body);
  res.status(201).json({
    data: {
      addContact,
    },
  });
};

module.exports = add;
