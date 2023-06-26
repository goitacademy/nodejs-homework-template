const fs = require('fs').promises;
const uuid = require('uuid').v4;

const catchAsync = require('../utils/catchAsync');
const { updateContactValidator, createContactValidator } = require('../utils/contactsValidator');

exports.getContactsList = catchAsync(async (req, res) => {
  const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));
  res.status(200).json({ contacts });
});

exports.getById = async (req, res) => {
  const { contact } = req;

  res.status(200).json({
    contact,
  });
};

exports.addContact = async (req, res) => {
  const { error, value } = createContactValidator(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));

  const newContact = {
    id: uuid(),
    ...value,
  };
  contacts.push(newContact);
  await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));
  res.status(201).json({
    contact: newContact,
  });
};

exports.removeContact = async (req, res) => {
  const { index, contacts } = req;

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));
  return res.status(200).json({
    message: 'Contact deleted',
    deletedContact: deletedContact[0],
  });
};

exports.updateContact = async (req, res) => {
  const { index, contacts } = req;
  const { error, value } = updateContactValidator(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (value.name) {
    contacts[index].name = value.name;
  }
  if (value.email) {
    contacts[index].email = value.email;
  }
  if (value.phone) {
    contacts[index].phone = value.phone;
  }

  const updatedContact = contacts[index];
  await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));
  return res.status(200).json({
    message: 'Contact updated',
    updatedContact: updatedContact,
  });
};
