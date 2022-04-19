const {getAllContacts, overwriteСontacts} = require('../utils');
const { v4 } = require('uuid');

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contacts = await getAllContacts();
  const newContact = { id: v4(), name, email, phone  };
  contacts.push(newContact)
  await overwriteСontacts(contacts)
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact
    }
  })
};

module.exports = addContact;