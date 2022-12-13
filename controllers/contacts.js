const { contactValidation } = require('../validation/contact.validation');
const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateIsFavoriteContact,
} = require('../services/contacts');


const getContactsController = async (_, res) => {
  const contacts = await getContacts();

  contacts?.length > 0
    ? res.json(contacts)
    : res.status(400).json({ message: 'Collection empty' });
};

const getContactByIDController = async ({ params }, res) => {
  const { contactId } = params;
  const contact = await getContactById(contactId);

  contact
    ? res.json({ contact })
    : res.status(404).json({ message: 'Not found' });
};

const postContactController = async ({ body }, res) => {
  const { error } = contactValidation(body);

  if (error) {
    res.status(400).json({ message: 'Invalid data' });
  } else {
    const contact = await addContact(body);

    contact
      ? res.status(201).json(contact)
      : res.status(400).json({ message: 'Missing required name field' });
  };
};

const deleteContactController = async ({ params }, res) => {
  const { contactId } = params;
  const contact = await deleteContact(contactId);

  contact
    ? res.json({ message: 'Contact deleted' })
    : res.status(404).json({ message: 'Not found' })
    
}

const putContactController = async ({ params, body }, res) => {
  const { error } = contactValidation(body);

  if (error) {
    res.status(400).json({ message: 'Invalid data' });
  } else {
    const { contactId } = params;
    const contact = await updateContact(contactId, body);

    contact
      ? res.json(contact)
      : res.status(404).json({ message: 'Not found' });
  };
};

const updateStatusContactController = async ({ params, body }, res) => {
  const { contactId } = params;
  
  if (!(typeof body?.favorite === 'boolean')) {
    res.status(400).json({ message: "Missing field favorite" });
  } else {
    const contact = await updateIsFavoriteContact(contactId, body.favorite);
  
    contact
      ? res.json(contact)
      : res.status(404).json({ message: 'Not found' });
  };
};

module.exports = {
  getContactsController,
  getContactByIDController,
  postContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
};