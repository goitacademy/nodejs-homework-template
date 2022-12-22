const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateContactStatus,
} = require('../service');

const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require('../utils/validation');

const listContactsController = async (req, res, next) => {
  const data = await getAllContacts();
  res.json(data);
};

const getContactController = async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  console.log(data);
  if (!data) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(data);
};

const deleteContactController = async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (!data) {
    res.status(404).json({ message: 'Not found' });

    return;
  }
  res.json({ message: 'contact deleted' });
};

const updateContactController = async (req, res, next) => {
  const { error } = await updateContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(updatedContact);
};

const addContactController = async (req, res, next) => {
  const { error } = await addContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }
  const data = await createContact(req.body);
  res.status(201).json(data);
};

const updateContactStatusController = async (req, res, next) => {
  const { error } = await updateContactStatusSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing field favorite',
    });
    return;
  }

  const data = await updateContactStatus(req.params.contactId, req.body);
  if (!data) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.status(201).json(data);
};

module.exports = {
  addContactController,
  listContactsController,
  getContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
};
