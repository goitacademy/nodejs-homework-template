const Contacts = require('../../models/contacts');

const postNewContact = async (req, res) => {
  const newContact = await Contacts.addContact(req.body);
  if (!newContact) {
    return res.json({
      status: 'error',
      code: 400,
      message: 'missing required name field',
    });
  }
  return res
    .status(201)
    .json({ status: 'success', code: 201, data: { newContact } });
};

module.exports = postNewContact;
