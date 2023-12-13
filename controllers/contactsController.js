const uuid = require('uuid').v4;

const { catchAsync, contactsValidators } = require('../utils');
const { writeContacts, getContacts } = require('../models');

exports.listContacts = catchAsync(async (req, res) => {
  const contacts = await getContacts();
  res.json(contacts);
});
exports.getContactById = (req, res) => {
  const { contact } = req;
  res.json(contact);
};
exports.addContact = catchAsync(async ({ body }, res) => {
  const { value, error } = contactsValidators.createContactValidator(body);
  if (error) {
    res
      .status(400)
      .json({ message: `missing required field - ${error.message}` });
    return;
  }
  const { name, email, phone } = value;
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  const contacts = await getContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  res.status(201).json(newContact);
});

exports.updateContact = catchAsync(async (req, res) => {
  const { contact } = req;
  const contacts = await getContacts();
  const updatedContact = { ...contact, ...req.body };

  const newContacts = contacts.map((item) => {
    if (item.id === contact.id) {
      return updatedContact;
    }
    return item;
  });
  await writeContacts(newContacts);
  res.json(updatedContact);
});

exports.removeContact = catchAsync(async (req, res) => {
  const contacts = await getContacts();
  const { contact } = req;

  const filteredContacts = contacts.filter((item) => item.id !== contact.id);
  await writeContacts(filteredContacts);
  res.status(200).json({ message: 'contact deleted' });
});
