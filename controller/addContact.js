const ContactsModel = require("../model/contacts");

const addContact = async (req, res) => {
  const addedContact = await ContactsModel.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      addedContact,
    },
  });
};

module.exports = addContact;
