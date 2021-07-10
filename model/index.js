const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');
const contacts = require('./contacts.json');
const contactSchema = require('./validate');

const listContacts = async (req, res) => {
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const updateContactsJSON = async contacts => {
  const str = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, str);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const selectContact = contacts.find(
    contact => contact.id.toString() === contactId,
  );
  if (!selectContact) {
    return await res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact with this id not found',
    });
  }
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (index === -1) {
    return await res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }
  contacts.splice(index, 1);

  await res.status(200).json({
    status: 'success',
    code: '200',
    message: 'No Content',
  });
};

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    await res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }
  const allContacts = await listContacts();
  const id = allContacts[allContacts.length - 1].id + 1;
  const newContact = { ...req.body, id: id };
  contacts.push(newContact);

  await res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const index = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (!name && !email && !phone) {
    return await res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Not found',
    });
  }
  if (index === -1) {
    return await res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    });
  }
  contacts[index] = { ...req.body, ...contacts[index] };
  await res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index],
    },
  });
  updateContactsJSON(contacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
