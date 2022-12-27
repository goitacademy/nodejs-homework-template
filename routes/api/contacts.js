import express from 'express';
import actions from '../../models/contacts.js';
import addContactValidation from '../../middleware/validationMiddleware.js';

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = actions;

router.get('/', async (_, res) => {
  const { data: contactList } = await listContacts();

  if (!contactList) {
    return res.status(404).json({
      message: `Not found`,
    });
  }

  res.status(200).json(JSON.parse(contactList));
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const { data: contact } = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(JSON.parse(contact));
});

router.post('/', addContactValidation, async (req, res) => {
  const { data: newContact } = await addContact(req.body);

  if (!newContact) {
    return res.status(400).json({ message: 'Bad request' });
  }

  res.status(201).json(JSON.parse(newContact));
});

router.put('/:contactId', addContactValidation, async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  const { data: updatedContact } = await updateContact({
    contactId,
    ...body,
  });

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(JSON.parse(updatedContact));
});

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const { data: contact } = await removeContact(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ message: 'Contact deleted' });
});

export default router;
