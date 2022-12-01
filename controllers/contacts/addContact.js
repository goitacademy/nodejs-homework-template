const contactsOperations = require("../../models/contacts.js");

async function addContact(req, res) {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
}

module.exports = addContact;
