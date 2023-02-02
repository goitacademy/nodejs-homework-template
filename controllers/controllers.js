const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../services/contacts');

const controllerGetContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const controllerGetContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (contactById === undefined) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contactById },
  });
};

const controllerPostContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contactsList = await listContacts();

  const contactId = Math.floor(Math.random() * 100);
  const isId = contactsList.some(contact => Number(contact.id) === contactId);
  if (isId) {
    controllerPostContact(req, res, next);
    return;
  }

  const contact = {
    id: `${contactId}`,
    name,
    email,
    phone,
  };
  addContact(contact);
  res.json({
    status: 'success',
    code: 201,
    data: { contact },
  });
};

const controllerDeleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactsList = await listContacts();
  const contact = contactsList.filter(el => el.id === contactId);

  if (contact.length === 0) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  removeContact(contactId);
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: { contact },
  });
};

const controllerPutContact = async (req, res, next) => {
  const { contactId } = req.params;
  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }

  const contact = await updateContact(contactId, req.body);

  if (contact === null) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

module.exports = {
  controllerGetContacts,
  controllerGetContactById,
  controllerPostContact,
  controllerDeleteContact,
  controllerPutContact,
};
